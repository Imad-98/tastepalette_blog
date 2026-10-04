'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState, useTransition, type ReactNode } from 'react'
import type { CategoryValue, CountryCode } from '@/lib/recipes'

type State = { q: string; category: CategoryValue | null; country: CountryCode | null }

type Filters = {
  query: string
  setQuery: (q: string) => void
  submitSearch: () => void
  category: CategoryValue | null
  setCategory: (c: CategoryValue | null) => void
  country: CountryCode | null
  setCountry: (c: CountryCode | null) => void
  reset: () => void
  isPending: boolean
}

const FiltersContext = createContext<Filters | null>(null)

const EMPTY: State = { q: '', category: null, country: null }

export function FiltersProvider({
  children,
  initial = EMPTY,
  liveSearch = true,
}: {
  children: ReactNode
  initial?: State
  liveSearch?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<State>(initial)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => clearTimer(), [])

  function clearTimer() {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }

  function navigate(next: State) {
    clearTimer()
    const params = new URLSearchParams()
    if (next.q.trim()) params.set('q', next.q.trim())
    if (next.category) params.set('category', next.category)
    if (next.country) params.set('country', next.country)
    const url = params.size ? `/?${params}` : '/'
    startTransition(() => {
      if (pathname === '/') router.replace(url, { scroll: false })
      else router.push(url)
    })
  }

  function update(patch: Partial<State>) {
    const next = { ...state, ...patch }
    setState(next)
    navigate(next)
  }

  const value: Filters = {
    query: state.q,
    setQuery: (q) => {
      const next = { ...state, q }
      setState(next)
      if (!liveSearch) return
      clearTimer()
      timer.current = setTimeout(() => navigate(next), 300)
    },
    submitSearch: () => navigate(state),
    category: state.category,
    setCategory: (category) => update({ category }),
    country: state.country,
    setCountry: (country) => update({ country }),
    reset: () => update(EMPTY),
    isPending,
  }

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}

export function useFilters() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters must be used within FiltersProvider')
  return ctx
}
