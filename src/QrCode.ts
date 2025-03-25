import { encodeQR } from 'qr'

export type QrCode = {
  edgeLength: number
  finderLength: number
  grid: boolean[][]
  value: string
}

export function create(value: string, options: QrCode.Options = {}): QrCode {
  const { errorcorrection, version } = options

  const grid = encodeQR(value, 'raw', {
    border: 0,
    ecc: errorcorrection,
    scale: 1,
    version: version,
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
    errorcorrection?: 'high' | 'low' | 'medium' | 'quartile' | undefined
    version?: number | undefined
  }
}
