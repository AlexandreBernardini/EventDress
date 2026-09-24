import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"

const links = [
  { to: "/", label: "Présentation" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/rendez-vous", label: "Rendez-vous" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-ink/10 bg-cream/90 backdrop-blur-sm"
          : "border-transparent bg-cream"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Event Dress" className="h-11 w-auto" />
        </NavLink>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `font-display text-[15px] uppercase tracking-widest-plus transition-colors ${
                  isActive ? "text-ink" : "text-ink/50 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-ink/10 bg-cream px-6 py-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 font-display text-base uppercase tracking-widest-plus ${
                  isActive ? "text-ink" : "text-ink/50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
