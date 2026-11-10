import clsx from 'clsx'

interface TagListProps {
  tags: readonly string[]
  className?: string
}

/** Tag oranye dipisah koma, seperti di blog referensi. */
export function TagList({ tags, className }: TagListProps) {
  return (
    <ul className={clsx('flex flex-wrap gap-x-1.5 text-[15px] leading-[1.7]', className ?? 'text-link')}>
      {tags.map((tag, index) => (
        <li key={tag}>
          #{tag}
          {index < tags.length - 1 ? ',' : null}
        </li>
      ))}
    </ul>
  )
}
