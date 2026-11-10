import type { ReactNode } from "react"

type Props = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  /** h1 pour un en-tête de page (défaut), h2 pour un en-tête de section. */
  as?: "h1" | "h2"
  className?: string
}

/**
 * En-tête centré commun à toutes les pages et sections :
 * sur-titre à filets, grand titre serif, texte d'introduction.
 */
export default function PageHeader({ eyebrow, title, intro, as = "h1", className = "" }: Props) {
  const Heading = as
  return (
    <header
      className={`mx-auto flex max-w-2xl animate-fade-up flex-col items-center gap-5 text-center ${className}`}
    >
      <span className="eyebrow eyebrow-ruled">{eyebrow}</span>
      <Heading className={`${as === "h1" ? "heading-lg" : "heading-md"} text-ink`}>{title}</Heading>
      {intro && <div className="lead max-w-xl">{intro}</div>}
    </header>
  )
}
