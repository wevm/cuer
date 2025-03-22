import QRCode from 'qrcode'

export type QrCode = {
  edgeLength: number
  finderLength: number
  matrix: number[][]
  totalLength: number
  value: string
}

export function create(value: string, options: QrCode.Options = {}): QrCode {
  const { errorCorrectionLevel = 'medium' } = options

  const data = QRCode.create(value, {
    ...options,
    errorCorrectionLevel,
  }).modules.data

  const finderLength = 7
  const totalLength = data.length
  const edgeLength = Math.sqrt(totalLength)

  const matrix = new Array(edgeLength)
    .fill(0)
    .map((_, i) =>
      new Array(edgeLength)
        .fill(0)
        .map((_, j) => data[i * edgeLength + j] ?? 0),
    )

  return {
    edgeLength,
    finderLength,
    matrix,
    totalLength,
    value,
  }
}

export declare namespace QrCode {
  type Options = QRCode.QRCodeOptions
}
