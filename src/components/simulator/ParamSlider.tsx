import { memo, useId } from 'react'
import { Tex } from '@/components/ui/Tex'
import { formatNumber } from '@/lib/format'
import type { ParamKey } from '@/lib/quadratic'

interface ParamSliderProps {
  name: ParamKey
  value: number
  min: number
  max: number
  step: number
  onChange: (name: ParamKey, value: number) => void
}

/** Satu baris kontrol: label parameter, slider, dan nilai saat ini. */
export const ParamSlider = memo(function ParamSlider({
  name,
  value,
  min,
  max,
  step,
  onChange,
}: ParamSliderProps) {
  const id = useId()

  return (
    <div className="grid grid-cols-[28px_1fr_52px] items-center gap-3 px-5 py-1.5 text-[15px]">
      <label htmlFor={id} className="text-ink">
        <Tex tex={name} />
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(name, event.currentTarget.valueAsNumber)}
        className="min-h-11 w-full accent-brand"
      />
      <output htmlFor={id}>{formatNumber(value)}</output>
    </div>
  )
})
