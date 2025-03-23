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
    const { children, errorCorrection, value, version } = props

    const qrcode = React.useMemo(
      () =>
        QrCode.create(value, {
          errorCorrection,
          version,
        }),
      [value, errorCorrection, version],
    )

    const cellSize = 1
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
    export type Props = React.PropsWithChildren<
      QrCode.QrCode.Options & {
        value: string
      }
    >
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
  // - Customize path props
  export function Cells() {
    const { cellSize, qrcode } = React.useContext(Context)

    // Build a single path containing all dots
    let path = ''

    for (let i = 0; i < qrcode.grid.length; i++) {
      const row = qrcode.grid[i]
      if (!row) continue
      for (let j = 0; j < row.length; j++) {
        const cell = row[j]
        if (!cell) continue

        // Skip rendering dots in the finder pattern areas
        const topLeftFinder = i < qrcode.finderLength && j < qrcode.finderLength
        const topRightFinder =
          i < qrcode.finderLength &&
          j >= qrcode.edgeLength - qrcode.finderLength
        const bottomLeftFinder =
          i >= qrcode.edgeLength - qrcode.finderLength &&
          j < qrcode.finderLength
        if (topLeftFinder || topRightFinder || bottomLeftFinder) continue

        // Add inset for padding
        const inset = cellSize * 0.1
        const r = (cellSize - inset * 2) / 2

        // Calculate center positions
        const cx = j * cellSize + cellSize / 2
        const cy = i * cellSize + cellSize / 2

        // Add circle subpath to the overall path data
        // M cx,cy-r a r,r 0 1,0 0,2r a r,r 0 1,0 0,-2r z
        path += `M ${cx},${cy - r} a ${r},${r} 0 1,0 0,${r * 2} a ${r},${r} 0 1,0 0,${-r * 2} z `
      }
    }

    return <path d={path} fill="currentColor" />
  }
}
