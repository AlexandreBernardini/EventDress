export type User = { id: number; email: string; name: string }

async function safeJson(res: Response): Promise<Record<string, unknown>> {
  try {
    return await res.json()
  } catch {
    return { error: "Le serveur est indisponible pour le moment." }
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<{ ok: boolean; status: number; data: T & { error?: string } }> {
  try {
    const res = await fetch(`/api/auth/${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    return { ok: res.ok, status: res.status, data: (await safeJson(res)) as T & { error?: string } }
  } catch {
    return { ok: false, status: 0, data: { error: "Impossible de contacter le serveur." } as T & { error?: string } }
  }
}

export async function fetchMe(): Promise<User | null> {
  try {
    const res = await fetch("/api/auth/me.php", { credentials: "include" })
    if (!res.ok) return null
    const data = (await safeJson(res)) as { user?: User }
    return data.user ?? null
  } catch {
    return null
  }
}
