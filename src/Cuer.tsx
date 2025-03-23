import * as React from 'react'
import * as QrCode from './QrCode.js'

/**
 * Renders a QR code with a finder pattern, cells, and an `arena` (if provided).
 *
 * @params {@link Cuer.Props}
 * @returns A {@link React.ReactNode}
 */
export function Cuer(props: Cuer.Props) {
  const { arena, ...rest } = props
  return (
    <Cuer.Root {...rest}>
      <Cuer.Finder />
      <Cuer.Cells />
      {arena && (
        <Cuer.Arena>
          {typeof arena === 'string' ? (
            <img
              alt="Arena"
              src={arena}
              style={{
                borderRadius: 1,
                height: '100%',
                objectFit: 'cover',
                width: '100%',
              }}
            />
          ) : (
            arena
          )}
        </Cuer.Arena>
      )}
    </Cuer.Root>
  )
}

export namespace Cuer {
  export type Props = React.PropsWithChildren<
    QrCode.QrCode.Options & {
      /**
       * Arena to display in the center of the QR code.
       *
       * - `string`: will be rendered as an image.
       * - `ReactNode`: will be rendered as a node.
       */
      arena?: React.ReactNode | string | undefined
      /**
       * Class name for the root element.
       */
      className?: string | undefined
      /**
       * Foreground color for the QR code.
       *
       * @default "currentColor"
       */
      color?: string | undefined
      /**
       * Size for the QR code.
       *
       * @default "100%"
       */
      size?: React.CSSProperties['width'] | undefined
      /**
       * Value to encode in the QR code.
       */
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

  /**
   * Root component for the QR code.
   *
   * @params {@link Root.Props}
   * @returns A {@link React.ReactNode}
   */
  export function Root(props: Root.Props) {
    const { children, size = '100%', value, version, ...rest } = props

    // Check if the children contain an `Arena` component.
    const hasArena = React.useMemo(
      () =>
        (
          React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null
            if (typeof child.type === 'string') return null
            if (
              'displayName' in child.type &&
              child.type.displayName === 'Arena'
            )
              return true
            return null
          }) ?? []
        ).some(Boolean),
      [children],
    )

    // Create the QR code.
    const qrcode = React.useMemo(() => {
      let errorCorrection = props.errorCorrection
      // If the QR code has an arena, use a higher error correction level.
      if (hasArena && errorCorrection === 'low') errorCorrection = 'medium'
      return QrCode.create(value, {
        errorCorrection,
        version,
      })
    }, [value, hasArena, props.errorCorrection, version])

    const cellSize = 1
    const edgeSize = qrcode.edgeLength * cellSize
    const finderSize = (qrcode.finderLength * cellSize) / 2
    const arenaSize = hasArena ? Math.floor(edgeSize / 4) : 0

    const context = React.useMemo(
      () => ({ arenaSize, cellSize, edgeSize, qrcode, finderSize }),
      [arenaSize, edgeSize, qrcode, finderSize],
    )

    return (
      <Context.Provider value={context}>
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
    export const displayName = 'Root'

    export type Props = React.PropsWithChildren<
      QrCode.QrCode.Options &
        Omit<
          React.SVGProps<SVGSVGElement>,
          'children' | 'width' | 'height' | 'version'
        > & {
          /**
           * Size for the QR code.
           *
           * @default "100%"
           */
          size?: React.CSSProperties['width'] | undefined
          /**
           * Value to encode in the QR code.
           */
          value: string
        }
    >
  }

  /**
   * Finder component for the QR code. The finder pattern is the squares
   * on the top left, top right, and bottom left of the QR code.
   *
   * @params {@link Finder.Props}
   * @returns A {@link React.ReactNode}
   */
  export function Finder(props: Finder.Props) {
    const { className, fill, innerClassName, radius = 0.25 } = props
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
            stroke={fill ?? 'currentColor'}
            fill="transparent"
            x={outerX}
            y={outerY}
            width={cellSize + (finderSize - cellSize) * 2}
            height={cellSize + (finderSize - cellSize) * 2}
            rx={2 * radius * (finderSize - cellSize)}
            ry={2 * radius * (finderSize - cellSize)}
            strokeWidth={cellSize}
          />
          <rect
            className={innerClassName}
            fill={fill ?? 'currentColor'}
            x={innerX}
            y={innerY}
            width={cellSize * 3}
            height={cellSize * 3}
            rx={2 * radius * cellSize}
            ry={2 * radius * cellSize}
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
    export const displayName = 'Finder'

    export type Props = Pick<
      React.SVGProps<SVGRectElement>,
      'className' | 'stroke' | 'fill'
    > & {
      /**
       * Class name for the inner rectangle.
       */
      innerClassName?: string | undefined
      /**
       * Radius scale (between 0 and 1) for the finder.
       *
       * - `0`: no radius
       * - `1`: full radius
       *
       * @default 0.25
       */
      radius?: number | undefined
    }
  }

  /**
   * Cells for the QR code.
   *
   * @params {@link Cells.Props}
   * @returns A {@link React.ReactNode}
   */
  export function Cells(props: Cells.Props) {
    const {
      className,
      fill = 'currentColor',
      inset: inset_ = true,
      radius = 1,
    } = props
    const { arenaSize, cellSize, qrcode } = React.useContext(Context)
    const { edgeLength, finderLength } = qrcode

    const path = React.useMemo(() => {
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
          const inset = inset_ ? cellSize * 0.1 : 0
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

      return path
    }, [
      arenaSize,
      cellSize,
      edgeLength,
      finderLength,
      qrcode.grid,
      inset_,
      radius,
    ])

    return <path className={className} d={path} fill={fill} />
  }

  export namespace Cells {
    export const displayName = 'Cells'

    export type Props = Pick<
      React.SVGProps<SVGPathElement>,
      'className' | 'filter' | 'fill'
    > & {
      /**
       * @deprecated @internal
       */
      hasArena?: boolean | undefined
      /**
       * Whether to add an inset to the cells.
       *
       * @default true
       */
      inset?: boolean | undefined
      /**
       * Radius scale (between 0 and 1) for the cells.
       *
       * - `0`: no radius
       * - `1`: full radius
       *
       * @default 1
       */
      radius?: number | undefined
    }
  }

  /**
   * Arena component for the QR code. The arena is the area in the center
   * of the QR code that is not part of the finder pattern.
   *
   * @params {@link Arena.Props}
   * @returns A {@link React.ReactNode}
   */
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

  export namespace Arena {
    export const displayName = 'Arena'

    export type Props = {
      children: React.ReactNode
    }
  }
}
