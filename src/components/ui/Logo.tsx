interface LogoProps {
  className?: string
}

/** Mozaik persegi warna-warni: kotak besar dibagi lagi menjadi kotak yang makin kecil. */
export function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <rect y="30" width="50" height="50" fill="#ff0000" />
      <rect width="30" height="30" fill="#ff7a00" />
      <rect x="50" y="50" width="30" height="30" fill="#ff7a00" />
      <rect x="30" width="30" height="30" fill="#ffee00" />
      <rect x="60" width="20" height="20" fill="#00d84a" />
      <rect x="60" y="20" width="10" height="10" fill="#1f4fff" />
      <rect x="70" y="20" width="10" height="10" fill="#8a2be2" />
      <rect x="50" y="30" width="20" height="20" fill="#00d84a" />
      <rect x="70" y="30" width="10" height="10" fill="#ff0000" />
      <rect x="70" y="40" width="10" height="10" fill="#ffee00" />
      <g fill="#000" fontFamily="Rubik, sans-serif" fontSize="9" textAnchor="middle">
        <text x="25" y="59">1</text>
        <text x="15" y="19">2</text>
        <text x="65" y="69">2</text>
        <text x="45" y="19">3</text>
        <text x="60" y="43">4</text>
      </g>
    </svg>
  )
}
