import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
}

export function ChevronLeftIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  )
}

export function ChevronRightIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export function ArrowRightIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 12h15" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  )
}

export function BagIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

export function UserIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />
    </svg>
  )
}

export function CloseIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function CheckIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

export function CalendarIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="0.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </svg>
  )
}

export function SparkleIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 3.5c.6 4.4 2.1 5.9 6.5 6.5-4.4.6-5.9 2.1-6.5 6.5-.6-4.4-2.1-5.9-6.5-6.5 4.4-.6 5.9-2.1 6.5-6.5Z" />
      <path d="M18.5 15.5c.25 1.6.9 2.25 2.5 2.5-1.6.25-2.25.9-2.5 2.5-.25-1.6-.9-2.25-2.5-2.5 1.6-.25 2.25-.9 2.5-2.5Z" />
    </svg>
  )
}

export function HangerIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 8.5V7.6a2 2 0 1 0-2-2" />
      <path d="M12 8.5 3.3 15.2a1 1 0 0 0 .6 1.8h16.2a1 1 0 0 0 .6-1.8L12 8.5Z" />
    </svg>
  )
}

export function StarIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} {...props}>
      <path d="m12 3.2 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3.2Z" />
    </svg>
  )
}

export function GoogleIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.95l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.94 10.94 0 0 0 12 1 11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}
