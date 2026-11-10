import clsx from 'clsx'
import type { ReactNode } from 'react'

interface PlaceholderProps {
  children?: ReactNode
  className?: string
}

/** Kotak penanda foto / thumbnail video seperti pada desain. */
export function Placeholder({ children, className }: PlaceholderProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center border-2 border-ink bg-tint text-muted',
        className,
      )}
    >
      {children}
    </div>
  )
}
