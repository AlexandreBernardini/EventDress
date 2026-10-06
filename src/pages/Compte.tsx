import { type FormEvent, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { apiPost, fetchMe, type User } from "../lib/api"

const errors: Record<string, string> = {
  connexion_annulee: "La connexion a été annulée, réessaie.",
  email_non_verifie: "Ton adresse Google doit être vérifiée pour se connecter.",
  google_indisponible: "Google est indisponible pour le moment, réessaie plus tard.",
}

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

  if (loading) {
    return <div className="py-32 text-center text-sm text-ink/50">Chargement…</div>
  }

  if (user) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-20">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">Mon compte</span>
          <h1 className="font-display text-4xl text-ink md:text-5xl">Bonjour{user.name ? `, ${user.name}` : ""}</h1>
          <p className="text-sm text-ink-soft/80">{user.email}</p>
        </div>

        <div className="border border-ink/15 p-8 text-center">
          <p className="text-sm text-ink-soft/80">Tes locations passées apparaîtront ici.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={logout}
            className="border border-ink px-8 py-3 font-display text-sm uppercase tracking-widest-plus text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    )
  }

  const shownError = message ?? (urlError ? errors[urlError] ?? "Une erreur est survenue" : null)

  return (
    <div className="mx-auto max-w-md px-6 py-16 md:px-10 md:py-20">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <span className="font-display text-sm uppercase tracking-widest-plus text-taupe">Mon compte</span>
        <h1 className="font-display text-4xl text-ink">{mode === "login" ? "Connexion" : "Créer un compte"}</h1>
      </div>

      <a
        href="/api/auth/google-start.php"
        className="flex w-full items-center justify-center gap-3 border border-ink/25 px-6 py-3 text-sm text-ink transition-colors hover:border-ink"
      >
        Continuer avec Google
      </a>

      <div className="my-8 flex items-center gap-4 text-xs uppercase tracking-widest-plus text-ink/40">
        <span className="h-px flex-1 bg-ink/15" /> ou <span className="h-px flex-1 bg-ink/15" />
      </div>

      <form onSubmit={submit} className="space-y-6">
        {mode === "register" && (
          <Input label="Prénom et nom" name="name" required />
        )}
        <Input label="Email" name="email" type="email" required />
        <Input label="Mot de passe" name="password" type="password" required minLength={8} />

        {shownError && <p className="text-sm text-[#8a2e2e]">{shownError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-ink px-8 py-3 font-display text-sm uppercase tracking-widest-plus text-cream transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {submitting ? "Un instant…" : mode === "login" ? "Se connecter" : "Créer mon compte"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-soft/80">
        {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login")
            setMessage(null)
          }}
          className="underline underline-offset-4 hover:text-ink"
        >
          {mode === "login" ? "Créer un compte" : "Se connecter"}
        </button>
      </p>
    </div>
  )
}

function Input({
  label,
  name,
  type = "text",
  required = false,
  minLength,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  minLength?: number
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-display text-xs uppercase tracking-widest-plus text-ink/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        className="w-full border-0 border-b border-ink/25 bg-transparent py-2 text-sm text-ink focus:border-ink focus:outline-none"
      />
    </div>
  )
}
