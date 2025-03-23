import * as React from 'react'
import * as QrCode from './QrCode.js'

export function Cuer(props: Cuer.Props) {
  const { image, ...rest } = props
  return (
    <Cuer.Root {...rest}>
      <Cuer.Finder />
      <Cuer.Cells />
      {image && (
        <Cuer.Arena>
          <img
            alt="Arena"
            src={image}
            style={{
              borderRadius: 2,
              height: '100%',
              objectFit: 'cover',
              width: '100%',
            }}
          />
        </Cuer.Arena>
      )}
    </Cuer.Root>
  )
}

export namespace Cuer {
  export type Props = React.PropsWithChildren<
    QrCode.QrCode.Options & {
      className?: string | undefined
      image?: string | undefined
      size?: React.CSSProperties['width'] | undefined
      value: string
    }
  >

  export const Context = React.createContext<{
    arenaSize: number
    cellSize: number
    edgeSize: number
    finderSize: number
    qrcode: QrCode.QrCode
  }>(null as never)

  export function Root(props: Root.Props) {
    const {
      children,
      errorCorrection,
      size = '100%',
      value,
      version,
      ...rest
    } = props

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
    const arenaSize = Math.floor(edgeSize / 4)

    return (
      <Context.Provider
        value={{ arenaSize, cellSize, edgeSize, qrcode, finderSize }}
      >
        <svg
          {...rest}
          width={size}
          height={size}
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
      QrCode.QrCode.Options &
        Omit<
          React.SVGProps<SVGSVGElement>,
          'children' | 'width' | 'height' | 'version'
        > & {
          size?: React.CSSProperties['width'] | undefined
          value: string
        }
    >
  }

  export function Finder(props: Finder.Props) {
    const { className, fill, inner = {}, radius = 1, stroke } = props
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
            className={className}
            stroke={stroke ?? 'currentColor'}
            fill={fill ?? 'transparent'}
            x={outerX}
            y={outerY}
            width={cellSize + (finderSize - cellSize) * 2}
            height={cellSize + (finderSize - cellSize) * 2}
            rx={radius * (finderSize - cellSize)}
            ry={radius * (finderSize - cellSize)}
            strokeWidth={cellSize}
          />
          <rect
            className={inner.className}
            fill={inner.fill ?? 'currentColor'}
            x={innerX}
            y={innerY}
            width={cellSize * 3}
            height={cellSize * 3}
            rx={radius * cellSize}
            ry={radius * cellSize}
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
    export type Props = Pick<
      React.SVGProps<SVGRectElement>,
      'className' | 'stroke' | 'fill'
    > & {
      inner?:
        | Pick<React.SVGProps<SVGRectElement>, 'className' | 'stroke' | 'fill'>
        | undefined
      radius?: number | undefined
    }
  }

  export function Cells(props: Cells.Props) {
    const { className, fill = 'currentColor', radius = 1 } = props
    const { arenaSize, cellSize, qrcode } = React.useContext(Context)
    const { edgeLength, finderLength } = qrcode

    // Build a single path containing all dots
    let path = ''

    for (let i = 0; i < qrcode.grid.length; i++) {
      const row = qrcode.grid[i]
      if (!row) continue
      for (let j = 0; j < row.length; j++) {
        const cell = row[j]
        if (!cell) continue

        // Skip rendering dots in arena area.
        const start = edgeLength / 2 - arenaSize / 2
        const end = start + arenaSize
        if (i >= start && i <= end && j >= start && j <= end) continue

        // Skip rendering dots in the finder pattern areas
        const topLeftFinder = i < finderLength && j < finderLength
        const topRightFinder =
          i < finderLength && j >= edgeLength - finderLength
        const bottomLeftFinder =
          i >= edgeLength - finderLength && j < finderLength
        if (topLeftFinder || topRightFinder || bottomLeftFinder) continue

        // Add inset for padding
        const inset = cellSize * 0.1
        const innerSize = (cellSize - inset * 2) / 2

        // Calculate center positions
        const cx = j * cellSize + cellSize / 2
        const cy = i * cellSize + cellSize / 2

        // Calculate edge positions
        const left = cx - innerSize
        const right = cx + innerSize
        const top = cy - innerSize
        const bottom = cy + innerSize

        // Apply corner radius (clamped to maximum of innerSize)
        const r = radius * innerSize

        path += [
          `M ${left + r},${top}`,
          `L ${right - r},${top}`,
          `A ${r},${r} 0 0,1 ${right},${top + r}`,
          `L ${right},${bottom - r}`,
          `A ${r},${r} 0 0,1 ${right - r},${bottom}`,
          `L ${left + r},${bottom}`,
          `A ${r},${r} 0 0,1 ${left},${bottom - r}`,
          `L ${left},${top + r}`,
          `A ${r},${r} 0 0,1 ${left + r},${top}`,
          'z',
        ].join(' ')
      }
    }

    return <path className={className} d={path} fill={fill} />
  }

  export declare namespace Cells {
    type Props = Pick<
      React.SVGProps<SVGPathElement>,
      'className' | 'filter' | 'fill'
    > & {
      radius?: number | undefined
    }
  }

  export function Arena(props: Arena.Props) {
    const { children } = props
    const { arenaSize, cellSize, edgeSize } = React.useContext(Context)

    const start = Math.ceil(edgeSize / 2 - arenaSize / 2)
    const size = arenaSize + (arenaSize % 2)
    const padding = cellSize / 2

    return (
      <foreignObject x={start} y={start} width={size} height={size}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 1,
            justifyContent: 'center',
            height: '100%',
            overflow: 'hidden',
            width: '100%',
            padding,
            boxSizing: 'border-box',
          }}
        >
          {children}
        </div>
      </foreignObject>
    )
  }

  export declare namespace Arena {
    type Props = {
      children: React.ReactNode
    }
  }
}
