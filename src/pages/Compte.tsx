import { type FormEvent, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import Reveal from "../components/Reveal"
import { ArrowRightIcon, GoogleIcon, HangerIcon } from "../components/icons"
import { apiPost, fetchMe, type User } from "../lib/api"

const errors: Record<string, string> = {
  connexion_annulee: "La connexion a été annulée, veuillez réessayer.",
  email_non_verifie: "Votre adresse Google doit être vérifiée pour vous connecter.",
  google_indisponible: "Google est indisponible pour le moment, veuillez réessayer plus tard.",
}

const modes = [
  { value: "login", label: "Connexion" },
  { value: "register", label: "Créer un compte" },
] as const

export default function Compte() {
  const [searchParams] = useSearchParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const urlError = searchParams.get("erreur")

  useEffect(() => {
    fetchMe().then((u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const body = Object.fromEntries(form.entries())
    setSubmitting(true)
    setMessage(null)
    const res = await apiPost<{ user: User }>(mode === "login" ? "login.php" : "register.php", body)
    setSubmitting(false)
    if (res.ok) {
      setUser(res.data.user)
    } else {
      setMessage(res.data.error ?? "Une erreur est survenue")
    }
  }

  const logout = async () => {
    await apiPost("logout.php", {})
    setUser(null)
  }

  const switchMode = (next: "login" | "register") => {
    setMode(next)
    setMessage(null)
  }

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-5 py-40">
        <span
          aria-hidden
          className="h-9 w-9 animate-spin rounded-full border border-ink/15 border-t-ink [animation-duration:1.4s]"
        />
        <span className="eyebrow">Chargement</span>
      </div>
    )
  }

  if (user) {
    const firstName = user.name?.trim().split(/\s+/)[0]

    return (
      <section className="container-page py-16 md:py-24">
        <PageHeader
          eyebrow="Mon compte"
          title={`Bonjour${firstName ? `, ${firstName}` : ""}`}
          intro={<p>{user.email}</p>}
        />

        <Reveal delay={100} className="mx-auto mt-14 max-w-2xl md:mt-20">
          <div className="panel">
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-5 sm:px-10">
              <h2 className="font-display text-2xl text-ink">Mes locations</h2>
              <span className="eyebrow hidden sm:inline-flex">Historique</span>
            </div>

            <div className="flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-10 sm:py-16">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-taupe/50 text-taupe-deep">
                <HangerIcon className="h-7 w-7" />
              </span>
              <p className="lead max-w-sm">Vos locations passées apparaîtront ici.</p>
              <Link
                to="/catalogue"
                className="group inline-flex min-h-10 items-center gap-3 font-display text-sm uppercase tracking-widest-plus text-ink"
              >
                <span className="link-underline">Découvrir la collection</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-12 flex justify-center">
          <button type="button" onClick={logout} className="btn btn-outline">
            Se déconnecter
          </button>
        </Reveal>
      </section>
    )
  }

  const shownError = message ?? (urlError ? errors[urlError] ?? "Une erreur est survenue" : null)

  return (
    <section className="container-page py-16 md:py-24">
      <PageHeader eyebrow="Mon compte" title={mode === "login" ? "Connexion" : "Créer un compte"} />

      <Reveal delay={100} className="mx-auto mt-14 max-w-md md:mt-20">
        <div className="panel px-6 py-10 sm:px-10 sm:py-12">
          <div
            role="group"
            aria-label="Choisir entre connexion et création de compte"
            className="mb-10 grid grid-cols-2 border border-ink/15 p-1"
          >
            {modes.map((m) => (
              <button
                key={m.value}
                type="button"
                aria-pressed={mode === m.value}
                onClick={() => switchMode(m.value)}
                className={`min-h-11 px-2 font-display text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-500 ease-luxe sm:text-xs ${
                  mode === m.value ? "bg-ink text-cream" : "text-ink-soft hover:text-ink"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <a
            href="/api/auth/google-start.php"
            className="btn btn-outline w-full border-ink/25 font-sans text-[0.9375rem] font-normal normal-case tracking-normal hover:border-ink hover:bg-cream-dark/50 hover:text-ink"
          >
            <GoogleIcon className="h-[1.125rem] w-[1.125rem]" />
            Continuer avec Google
          </a>

          <div className="my-9 flex items-center gap-5" aria-hidden>
            <span className="h-px flex-1 bg-ink/12" />
            <span className="font-display text-sm italic text-taupe-deep">ou</span>
            <span className="h-px flex-1 bg-ink/12" />
          </div>

          <form onSubmit={submit} className="space-y-7">
            {mode === "register" && <Input label="Prénom et nom" name="name" autoComplete="name" required />}
            <Input label="Email" name="email" type="email" autoComplete="email" required />
            <Input
              label="Mot de passe"
              name="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              minLength={8}
              hint={mode === "register" ? "8 caractères minimum" : undefined}
            />

            {shownError && (
              <p role="alert" className="field-error border-l border-danger pl-4">
                {shownError}
              </p>
            )}

            <button type="submit" disabled={submitting} aria-busy={submitting} className="btn btn-primary w-full">
              {submitting && (
                <span
                  aria-hidden
                  className="h-3.5 w-3.5 animate-spin rounded-full border border-cream/30 border-t-cream"
                />
              )}
              {submitting ? "Un instant…" : mode === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  )
}

function Input({
  label,
  name,
  type = "text",
  required = false,
  minLength,
  autoComplete,
  hint,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  minLength?: number
  autoComplete?: string
  hint?: string
}) {
  const hintId = hint ? `${name}-hint` : undefined
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        aria-describedby={hintId}
        className="field-input"
      />
      {hint && (
        <p id={hintId} className="mt-2 text-xs text-ink-soft/80">
          {hint}
        </p>
      )}
    </div>
  )
}
