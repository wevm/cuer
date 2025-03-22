// TODO:
// - arena image

import * as React from 'react'
import * as QrCode from './QrCode.js'

export function Cuer(props: Cuer.Props) {
  return (
    <Cuer.Root {...props}>
      <Cuer.Finder />
      <Cuer.Cells />
    </Cuer.Root>
  )
}

export namespace Cuer {
  export type Props = Root.Props

  export const Context = React.createContext<{
    cellSize: number
    edgeSize: number
    finderSize: number
    qrcode: QrCode.QrCode
  }>(null as never)

  export function Root(props: Root.Props) {
    const { cellSize = 10, children, value } = props

    const qrcode = React.useMemo(() => QrCode.create(value), [value])

    const edgeSize = qrcode.edgeLength * cellSize
    const finderSize = (qrcode.finderLength * cellSize) / 2

    return (
      <Context.Provider value={{ cellSize, edgeSize, qrcode, finderSize }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${edgeSize} ${edgeSize}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>QR Code</title>
          {children}
        </svg>
      </Context.Provider>
    )
  }

  export namespace Root {
    export type Props = React.PropsWithChildren<{
      cellSize?: number | undefined
      value: string
    }>
  }

  // TODO:
  // - Customize radius
  // - Customize rect props
  export function Finder(_props: Finder.Props) {
    const { cellSize, edgeSize, finderSize } = React.useContext(Context)

    function Inner({ position }: { position: string }) {
      let outerX = finderSize - (finderSize - cellSize) - cellSize / 2
      if (position === 'top-right')
        outerX = edgeSize - finderSize - (finderSize - cellSize) - cellSize / 2

      let outerY = finderSize - (finderSize - cellSize) - cellSize / 2
      if (position === 'bottom-left')
        outerY = edgeSize - finderSize - (finderSize - cellSize) - cellSize / 2

      let innerX = finderSize - cellSize * 1.5
      if (position === 'top-right')
        innerX = edgeSize - finderSize - cellSize * 1.5

      let innerY = finderSize - cellSize * 1.5
      if (position === 'bottom-left')
        innerY = edgeSize - finderSize - cellSize * 1.5

      return (
        <>
          <rect
            x={outerX}
            y={outerY}
            width={cellSize + (finderSize - cellSize) * 2}
            height={cellSize + (finderSize - cellSize) * 2}
            rx={finderSize - cellSize}
            ry={finderSize - cellSize}
            stroke="currentColor"
            strokeWidth={cellSize}
            fill="transparent"
          />
          <rect
            x={innerX}
            y={innerY}
            width={cellSize * 3}
            height={cellSize * 3}
            rx={cellSize}
            ry={cellSize}
            fill="currentColor"
          />
        </>
      )
    }

    return (
      <>
        <Inner position="top-left" />
        <Inner position="top-right" />
        <Inner position="bottom-left" />
      </>
    )
  }

  export namespace Finder {
    export type Props = {}
  }

  // TODO:
  // - Customize radius
  // - Customize rect props
  export function Cells() {
    const { cellSize, qrcode } = React.useContext(Context)

    return qrcode.matrix.map((row, i) =>
      row.map((cell, j) => {
        if (!cell) return

        // Skip rendering dots in the finder pattern areas
        const finder =
          (i < qrcode.finderLength && j < qrcode.finderLength) ||
          (i < qrcode.finderLength &&
            j >= qrcode.edgeLength - qrcode.finderLength) ||
          (i >= qrcode.edgeLength - qrcode.finderLength &&
            j < qrcode.finderLength)
        if (finder) return

        // Add padding by reducing dot size
        const padding = cellSize * 0.15
        const r = (cellSize - padding * 2) / 2

        return (
          <rect
            // biome-ignore lint/suspicious/noArrayIndexKey:
            key={`${i}-${j}`}
            x={j * cellSize + cellSize / 2 - r}
            y={i * cellSize + cellSize / 2 - r}
            width={r * 2}
            height={r * 2}
            rx={r}
            ry={r}
            fill="currentColor"
          />
        )
      }),
    )
  }
}
