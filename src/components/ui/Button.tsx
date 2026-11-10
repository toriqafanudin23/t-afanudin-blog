import clsx from 'clsx'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router'

type Variant = 'outline' | 'primary'
type Size = 'md' | 'icon'

interface StyleProps {
  variant?: Variant
  size?: Size
}

export function buttonClass({ variant = 'outline', size = 'md' }: StyleProps = {}, className?: string) {
  return clsx(
    'inline-flex min-h-12 cursor-pointer items-center justify-center border-2 font-sans text-base font-semibold transition-colors duration-150',
    size === 'icon' ? 'min-w-12 px-0' : 'px-[26px]',
    variant === 'primary' ? 'border-brand bg-brand text-white hover:border-ink hover:bg-ink'
      : 'border-ink bg-white text-ink hover:bg-ink hover:text-white',
    className,
  )
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ComponentPropsWithoutRef<'button'> & StyleProps) {
  return <button type={type} className={buttonClass({ variant, size }, className)} {...props} />
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonClass({ variant, size }, className)} {...props} />
}
