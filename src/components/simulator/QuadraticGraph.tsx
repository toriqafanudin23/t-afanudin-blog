import { formatNumber } from '@/lib/format'
import {
  GRAPH,
  buildCurvePoints,
  describeGraph,
  findRoots,
  toSvgX,
  toSvgY,
  type QuadraticParams,
} from '@/lib/quadratic'

// Bagian statis (grid & sumbu) dibuat sekali di level modul, tidak ikut dirender ulang.
const GRID_X = Array.from({ length: Math.ceil(GRAPH.width / GRAPH.unit) }, (_, i) => (GRAPH.originX % GRAPH.unit) + i * GRAPH.unit)
const GRID_Y = Array.from({ length: Math.ceil(GRAPH.height / GRAPH.unit) }, (_, i) => (GRAPH.originY % GRAPH.unit) + i * GRAPH.unit)

const GRID = (
  <g className="stroke-line" strokeWidth={1}>
    {GRID_X.map((x) => (
      <line key={`x${x}`} x1={x} y1={0} x2={x} y2={GRAPH.height} />
    ))}
    {GRID_Y.map((y) => (
      <line key={`y${y}`} x1={0} y1={y} x2={GRAPH.width} y2={y} />
    ))}
  </g>
)

const AXES = (
  <g className="stroke-ink" strokeWidth={1.6}>
    <line x1={0} y1={GRAPH.originY} x2={GRAPH.width} y2={GRAPH.originY} />
    <line x1={GRAPH.originX} y1={0} x2={GRAPH.originX} y2={GRAPH.height} />
  </g>
)

/** Grafik f(x) = a(x − h)² + k dengan titik puncak dan akar. Semua nilai diturunkan saat render. */
export function QuadraticGraph(params: QuadraticParams) {
  const { a, h, k } = params
  const isParabola = a !== 0
  const roots = findRoots(params)

  const vertexX = toSvgX(h)
  const vertexY = toSvgY(k)
  // Label puncak pindah ke kiri/atas bila hampir menyentuh tepi kanvas.
  const labelOnLeft = vertexX > GRAPH.width - 150
  const labelX = labelOnLeft ? vertexX - 14 : vertexX + 14
  const labelY = vertexY + 24 > GRAPH.height - 12 ? vertexY - 14 : vertexY + 24

  return (
    <svg
      viewBox={`0 0 ${GRAPH.width} ${GRAPH.height}`}
      role="img"
      aria-label={describeGraph(params)}
      className="block w-full bg-white"
    >
      {GRID}
      {AXES}
      <polyline
        points={buildCurvePoints(params)}
        fill="none"
        className="stroke-cobalt"
        strokeWidth={3.5}
        strokeLinejoin="round"
      />

      {isParabola ? (
        <>
          <line
            x1={vertexX}
            y1={GRAPH.originY}
            x2={vertexX}
            y2={vertexY}
            className="stroke-brand"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
          {roots.length === 2 ? (
            <>
              <circle cx={toSvgX(roots[0])} cy={GRAPH.originY} r={5.5} className="fill-ink" />
              <circle cx={toSvgX(roots[1])} cy={GRAPH.originY} r={5.5} className="fill-ink" />
            </>
          ) : null}
          <circle
            cx={vertexX}
            cy={vertexY}
            r={8}
            className="fill-brand stroke-white"
            strokeWidth={2.5}
          />
          <g className="fill-ink font-sans" fontSize={13} fontWeight={600}>
            <text x={labelX} y={labelY} textAnchor={labelOnLeft ? 'end' : 'start'}>
              titik puncak ({formatNumber(h)}, {formatNumber(k)})
            </text>
            {roots.length === 2 ? (
              <>
                <text x={toSvgX(roots[0]) - 8} y={GRAPH.originY - 10} textAnchor="end">
                  {formatNumber(roots[0])}
                </text>
                <text x={toSvgX(roots[1]) + 8} y={GRAPH.originY - 10}>
                  {formatNumber(roots[1])}
                </text>
              </>
            ) : null}
          </g>
        </>
      ) : null}
    </svg>
  )
}
