import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import logo from "../assets/logo.png"
import { fetchMe, type User } from "../lib/api"
import { useCart } from "../lib/cart"
import { BagIcon, UserIcon } from "./icons"

const links = [
  { to: "/", label: "Présentation" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/collaborations", label: "Collabs" },
  { to: "/vente", label: "Vente" },
  { to: "/rendez-vous", label: "Rendez-vous" },
]

/*
 * Le logo est un PNG noir sur fond crème opaque. Ces filtres SVG transforment
 * sa luminance en transparence (fond → transparent, tracé → opaque) et le
 * recolorent : encre sur fond clair, crème sur la photo de l'accueil.
 */
const LOGO_ALPHA = "-0.2691 -0.9054 -0.0914 0 1.19"

function LogoFilters() {
  return (
    <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <filter id="logo-encre" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values={`0 0 0 0 0.110  0 0 0 0 0.102  0 0 0 0 0.090  ${LOGO_ALPHA}`} />
      </filter>
      <filter id="logo-creme" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values={`0 0 0 0 0.965  0 0 0 0 0.945  0 0 0 0 0.914  ${LOGO_ALPHA}`} />
      </filter>
    </svg>
  )
}

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > threshold)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return scrolled
}

export default function Navbar() {
  const { pathname } = useLocation()
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const [user, setUser] = useState<User | null>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  const count = useCart().length
  const firstName = user?.name.split(" ")[0]

  // Ferme le menu mobile à chaque changement de page
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    fetchMe().then(setUser)
  }, [pathname])

  // Après une navigation, place le focus sur le contenu principal (sinon il se perd sur <body>)
  const focusedPath = useRef(pathname)
  useEffect(() => {
    if (focusedPath.current === pathname) return
    focusedPath.current = pathname
    document.getElementById("contenu")?.focus({ preventScroll: true })
  }, [pathname])

  // Menu ouvert : bloque le défilement, rend la page masquée inerte, Échap pour fermer,
  // fermeture en passant en desktop
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const hidden = [document.getElementById("contenu"), document.querySelector("footer")].filter(
      (element): element is HTMLElement => element !== null,
    )
    hidden.forEach((element) => element.setAttribute("inert", ""))

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }
    const desktop = window.matchMedia("(min-width: 64rem)")
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onBreakpoint)
    return () => {
      document.body.style.overflow = previousOverflow
      hidden.forEach((element) => element.removeAttribute("inert"))
      window.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [open])

  // En-tête transparent superposé au hero de l'accueil
  const overlay = pathname === "/" && !scrolled && !open

  const headerTone = overlay
    ? "border-transparent bg-transparent text-cream"
    : open
      ? "border-ink/10 bg-cream text-ink"
      : "border-ink/10 bg-cream/85 text-ink backdrop-blur-md backdrop-saturate-150"

  const linkTone = overlay
    ? "text-cream/85 hover:text-cream aria-[current=page]:text-cream focus-visible:outline-cream"
    : "text-ink/70 hover:text-ink aria-[current=page]:text-ink"

  const iconTone = overlay
    ? "text-cream/90 hover:text-cream focus-visible:outline-cream"
    : "text-ink/75 hover:text-ink"

  const cartLabel = count > 0 ? `Panier, ${count} article${count > 1 ? "s" : ""}` : "Panier"
  const accountLabel = firstName ? `Mon compte (${firstName})` : "Mon compte"

  return (
    <>
      <a
        href="#contenu"
        className="btn btn-primary btn-sm fixed left-4 top-3 z-60 -translate-y-[200%] opacity-0 focus:translate-y-0 focus:opacity-100"
      >
        Aller au contenu
      </a>

      <LogoFilters />

      <header
        className={`sticky top-0 z-50 h-(--header-h) border-b transition-[background-color,border-color,color,backdrop-filter] duration-700 ease-luxe ${headerTone}`}
      >
        {/* Voile léger en appui du dégradé du hero, pour la lisibilité sur la photo */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-linear-to-b from-ink/25 to-transparent transition-opacity duration-700 ease-luxe ${
            overlay ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="container-page grid h-full grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <Link
            to="/"
            aria-label="Event Dress — accueil"
            className={`relative justify-self-start py-1 ${overlay ? "focus-visible:outline-cream" : ""}`}
          >
            <img
              src={logo}
              alt=""
              width={1054}
              height={1492}
              decoding="async"
              className={`h-12 w-auto [filter:url(#logo-encre)] transition-opacity duration-700 ease-luxe md:h-14 ${
                overlay ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src={logo}
              alt=""
              width={1054}
              height={1492}
              decoding="async"
              className={`absolute inset-0 m-auto h-12 w-auto [filter:url(#logo-creme)] transition-opacity duration-700 ease-luxe md:h-14 ${
                overlay ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-11">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={`link-reveal font-display text-[0.8125rem] font-medium uppercase tracking-[0.26em] ${linkTone}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end gap-1 sm:gap-2">
            <NavLink
              to="/compte"
              aria-label={accountLabel}
              className={`flex h-10 min-w-10 items-center justify-center gap-2.5 px-2 transition-colors duration-500 ${iconTone}`}
            >
              <UserIcon />
              {firstName && (
                <span
                  aria-hidden="true"
                  className="hidden max-w-32 truncate font-display text-[0.9375rem] tracking-wide lg:inline"
                >
                  {firstName}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/panier"
              aria-label={cartLabel}
              className={`relative flex h-10 w-10 items-center justify-center transition-colors duration-500 ${iconTone}`}
            >
              <BagIcon />
              {count > 0 && (
                <span
                  key={count}
                  aria-hidden="true"
                  className={`absolute right-0.5 top-0.5 flex h-4.5 min-w-4.5 animate-fade-in items-center justify-center rounded-full px-1 font-sans text-[0.625rem] font-normal leading-none tabular-nums transition-colors duration-500 ${
                    overlay ? "bg-cream text-ink" : "bg-ink text-cream"
                  }`}
                >
                  {count}
                </span>
              )}
            </NavLink>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className={`-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 transition-colors duration-500 lg:hidden ${iconTone}`}
            >
              <span
                className={`block h-px w-6 bg-current transition-transform duration-500 ease-luxe ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-current transition-transform duration-500 ease-luxe ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        id="menu-mobile"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-(--header-h) z-40 overflow-y-auto overscroll-contain bg-cream transition-[opacity,visibility] duration-500 ease-luxe lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-page flex min-h-full flex-col pb-10 pt-8 sm:pt-12">
          <span className="eyebrow">Menu</span>

          <nav aria-label="Menu" className="mt-6">
            <ul className="border-t border-ink/10">
              {links.map((link, index) => (
                <li
                  key={link.to}
                  style={{ transitionDelay: open ? `${100 + index * 70}ms` : "0ms" }}
                  className={`border-b border-ink/10 transition-[opacity,transform] duration-700 ease-luxe ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 py-4 font-display text-[2rem] leading-tight text-ink/75 transition-colors duration-300 hover:text-ink aria-[current=page]:text-ink sm:gap-7 sm:py-5 sm:text-[2.5rem]"
                  >
                    <span className="w-6 shrink-0 font-sans text-xs tabular-nums tracking-[0.2em] text-taupe-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-1 group-aria-[current=page]:italic">
                      {link.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div
            style={{ transitionDelay: open ? `${100 + links.length * 70}ms` : "0ms" }}
            className={`mt-auto grid grid-cols-2 gap-3 pt-12 transition-[opacity,transform] duration-700 ease-luxe ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <Link to="/panier" onClick={() => setOpen(false)} aria-label={cartLabel} className="btn btn-outline btn-sm px-3">
              <BagIcon className="h-4 w-4" />
              <span>Panier{count > 0 && ` (${count})`}</span>
            </Link>
            <Link to="/compte" onClick={() => setOpen(false)} aria-label={accountLabel} className="btn btn-outline btn-sm px-3">
              <UserIcon className="h-4 w-4" />
              <span className="truncate">{firstName ?? "Compte"}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
