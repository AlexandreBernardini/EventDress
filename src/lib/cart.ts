import { useMemo, useSyncExternalStore } from "react"

export type CartItem = {
  dressId: string
  name: string
  size: string
  pricePerDay: number
  image: string
  start: string
  end: string
}

const STORAGE_KEY = "eventdress-cart"
const EVENT = "cart-change"

function read(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CartItem[]
  } catch {
    return []
  }
}

function write(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(EVENT))
}

export function addToCart(item: CartItem) {
  write([...read(), item])
}

export function removeFromCart(index: number) {
  write(read().filter((_, i) => i !== index))
}

export function rentalDays(start: string, end: string): number {
  const ms = new Date(end).getTime() - new Date(start).getTime()
  return Math.max(1, Math.round(ms / 86_400_000) + 1)
}

export function itemTotal(item: CartItem): number {
  return item.pricePerDay * rentalDays(item.start, item.end)
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

export function useCart(): CartItem[] {
  const raw = useSyncExternalStore(subscribe, () => localStorage.getItem(STORAGE_KEY) ?? "[]", () => "[]")
  return useMemo(() => JSON.parse(raw) as CartItem[], [raw])
}
