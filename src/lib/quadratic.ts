import { formatNumber } from './format'

export interface QuadraticParams {
  a: number
  h: number
  k: number
}
export type ParamKey = keyof QuadraticParams

export const PARAM_KEYS = ['a', 'h', 'k'] as const satisfies readonly ParamKey[]

export const DEFAULT_PARAMS: QuadraticParams = { a: 0.25, h: 1, k: -2 }

export const PARAM_LIMITS: Record<ParamKey, { min: number; max: number; step: number }> = {
  a: { min: -2, max: 2, step: 0.05 },
  h: { min: -5, max: 5, step: 0.5 },
  k: { min: -5, max: 5, step: 0.5 },
}

/** Geometri kanvas SVG: 1 satuan koordinat = 38 px, titik asal di (240, 190). */
export const GRAPH = { width: 480, height: 340, unit: 38, originX: 240, originY: 190 } as const

export const toSvgX = (x: number) => GRAPH.originX + x * GRAPH.unit
export const toSvgY = (y: number) => GRAPH.originY - y * GRAPH.unit

/** Akar dari a(x − h)² + k = 0, terurut naik. Kosong bila a = 0 atau tidak memotong sumbu x. */
export function findRoots({ a, h, k }: QuadraticParams): number[] {
  if (a === 0) return []
  const squared = -k / a
  if (squared < 0) return []
  if (squared === 0) return [h]
  const distance = Math.sqrt(squared)
  return [h - distance, h + distance]
}

const X_MIN = -6.5
const X_STEP = 0.1
const SAMPLE_COUNT = 131 // X_MIN … 6,5; sedikit melebihi area terlihat (±6,3)

/** Titik-titik polyline untuk kurva. Bagian di luar kanvas dipotong oleh SVG itu sendiri. */
export function buildCurvePoints({ a, h, k }: QuadraticParams): string {
  const points: string[] = []
  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const x = X_MIN + i * X_STEP
    const y = a * (x - h) ** 2 + k
    // Presisi 1 desimal sudah cukup dan memperkecil ukuran DOM.
    points.push(`${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`)
  }
  return points.join(' ')
}

/** Deskripsi teks grafik untuk pembaca layar. */
export function describeGraph(params: QuadraticParams): string {
  const { a, h, k } = params
  const intro = `Grafik fungsi kuadrat dengan a = ${formatNumber(a)}, h = ${formatNumber(h)}, k = ${formatNumber(k)}.`
  if (a === 0) return `${intro} Karena a = 0, grafiknya berupa garis mendatar.`
  const vertex = `Titik puncak (${formatNumber(h)}, ${formatNumber(k)}).`
  const roots = findRoots(params)
  if (roots.length === 0) return `${intro} ${vertex} Tidak memotong sumbu x.`
  if (roots.length === 1) return `${intro} ${vertex} Menyinggung sumbu x di titik puncak.`
  return `${intro} ${vertex} Akar ${formatNumber(roots[0])} dan ${formatNumber(roots[1])}.`
}
