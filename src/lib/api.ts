export type User = { id: number; email: string; name: string }

export async function apiPost<T>(path: string, body: unknown): Promise<{ ok: boolean; status: number; data: T & { error?: string } }> {
  const res = await fetch(`/api/auth/${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return { ok: res.ok, status: res.status, data: await res.json() }
}

export async function fetchMe(): Promise<User | null> {
  const res = await fetch("/api/auth/me.php", { credentials: "include" })
  if (!res.ok) return null
  const data = (await res.json()) as { user: User }
  return data.user
}
