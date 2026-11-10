import { useCallback, useState } from 'react'
import { Tex } from '@/components/ui/Tex'
import {
  DEFAULT_PARAMS,
  PARAM_KEYS,
  PARAM_LIMITS,
  type ParamKey,
  type QuadraticParams,
} from '@/lib/quadratic'
import { ParamSlider } from './ParamSlider'
import { QuadraticGraph } from './QuadraticGraph'

/** Simulasi interaktif fungsi kuadrat di halaman tulisan. */
export function QuadraticSimulator() {
  const [params, setParams] = useState<QuadraticParams>(DEFAULT_PARAMS)

  // Functional setState + useCallback → callback stabil, ParamSlider (memo) tidak render ulang sia-sia.
  const handleChange = useCallback((name: ParamKey, value: number) => {
    setParams((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <div role="group" aria-label="Simulasi fungsi kuadrat" className="border-t-4 border-ink bg-tint">
      <div className="flex items-baseline justify-between px-5 py-4 font-medium text-ink">
        <span>Fungsi kuadrat</span>
        <Tex tex="f(x) = a(x - h)^2 + k" />
      </div>

      <QuadraticGraph {...params} />

      <div className="pt-2.5 pb-3">
        {PARAM_KEYS.map((key) => (
          <ParamSlider
            key={key}
            name={key}
            value={params[key]}
            {...PARAM_LIMITS[key]}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
}
