import { encodeQR } from '@paulmillr/qr'

export type QrCode = {
  edgeLength: number
  finderLength: number
  grid: boolean[][]
  value: string
}

export function create(value: string, options: QrCode.Options = {}): QrCode {
  const { errorCorrection, version } = options

  const grid = encodeQR(value, 'raw', {
    border: 0,
    ecc: errorCorrection as never, // https://github.com/paulmillr/qr/pull/17
    scale: 1,
    version: version as never, // https://github.com/paulmillr/qr/pull/17
  })

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
