import clsx from 'clsx'
import { Link } from 'react-router'

interface SectionHeadingProps {
  title: string
  linkLabel?: string
  linkTo?: string
  /** Tautan disembunyikan di ponsel kecuali diminta tampil. */
  linkAlwaysVisible?: boolean
  /** Garis hitam tebal di atas judul, sama seperti garis di atas judul kartu. */
  rule?: boolean
  className?: string
}

export function SectionHeading({
  title,
  linkLabel,
  linkTo,
  linkAlwaysVisible = false,
  rule = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx('flex items-baseline justify-between gap-6', rule && 'border-t-4 border-ink pt-5', className)}>
      <h2 className="text-[26px] leading-[1.15] md:text-[32px]">{title}</h2>
      {linkLabel && linkTo ? (
        <Link to={linkTo} className={clsx('link shrink-0', !linkAlwaysVisible && 'hidden md:inline')}>
          {linkLabel}
        </Link>
      ) : null}
    </div>
  )
}
