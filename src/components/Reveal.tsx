import { type CSSProperties, type ElementType, type ReactNode, useEffect, useRef, useState } from "react"

type Props = {
  children: ReactNode
  /** Délai d'apparition en ms (pour échelonner une liste). */
  delay?: number
  /** Balise rendue (div par défaut). */
  as?: ElementType
  className?: string
}

/**
 * Fait apparaître doucement son contenu (fondu + léger glissement)
 * lorsqu'il entre dans l'écran. Respecte prefers-reduced-motion via le CSS.
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined")

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
