import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import logo from "../assets/logo.png"
import { fetchMe, type User } from "../lib/api"
import { useCart } from "../lib/cart"

const links = [
  { to: "/", label: "Présentation" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/collaborations", label: "Collabs" },
  { to: "/vente", label: "Vente" },
  { to: "/rendez-vous", label: "Rendez-vous" },
]

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <path d="M5 8h14l-1 12H6L5 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" strokeLinecap="round" />
    </svg>
  )
}

function NavIcons() {
  const items = useCart()
  const count = items.length
  const [user, setUser] = useState<User | null>(null)

  const { pathname } = useLocation()

  useEffect(() => {
    fetchMe().then(setUser)
  }, [pathname])

  const firstName = user?.name.split(" ")[0]

  return (
    <div className="flex items-center gap-5">
      <Link to="/panier" aria-label="Panier" className="relative text-ink/70 transition-colors hover:text-ink">
        <BagIcon />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 font-sans text-[10px] text-cream">
            {count}
          </span>
        )}
      </Link>
      <Link to="/compte" className="flex items-center gap-2 text-ink/70 transition-colors hover:text-ink">
        <UserIcon />
        {firstName && <span className="hidden font-display text-sm sm:inline">{firstName}</span>}
      </Link>
    </div>
  )
}

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

        <nav className="hidden items-center gap-6 md:flex lg:gap-10">
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

        <div className="flex items-center gap-5">
          <NavIcons />
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
