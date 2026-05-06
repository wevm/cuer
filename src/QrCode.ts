import { encodeQR } from 'qr'

export type QrCode = {
  edgeLength: number
  finderLength: number
  grid: boolean[][]
  value: string
}

export function create(value: string, options: QrCode.Options = {}): QrCode {
  const { errorCorrection, version } = options

  const grid = encodeQR(value, 'raw', {
    border: 1,
    ecc: errorCorrection,
    scale: 1,
    version: version,
  })
    // Remove `border: 1` (`qr >=0.6` only allows positive numbers).
    .slice(1, -1)
    .map((row) => row.slice(1, -1))

  const finderLength = 7
  const edgeLength = grid.length

  return {
    edgeLength,
    finderLength,
    grid,
    value,
  }
}

export declare namespace QrCode {
  type Options = {
    errorCorrection?: 'high' | 'low' | 'medium' | 'quartile' | undefined
    version?: number | undefined
  }
}
