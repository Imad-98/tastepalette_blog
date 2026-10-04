'use client'

import { Search } from 'lucide-react'
import { categories } from '@/lib/recipes'
import { cn } from '@/lib/utils'
import { useFilters } from './filters-provider'
import { ThemeToggle } from './theme-toggle'

function SearchField({ className }: { className?: string }) {
  const { query, setQuery, submitSearch } = useFilters()
  return (
    <form
      role="search"
      className={cn('relative', className)}
      onSubmit={(e) => {
        e.preventDefault()
        submitSearch()
        document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <label htmlFor="recipe-search" className="sr-only">
        Search recipes
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="recipe-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes, ingredients..."
        className="h-10 w-full rounded-full border border-border bg-card pr-4 pl-10 text-sm text-foreground shadow-sm transition-shadow placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-3 focus:ring-ring/30"
      />
    </form>
  )
}

export function SiteHeader() {
  const { category, setCategory } = useFilters()

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2" aria-label="TastePalette home">
          <span
            className="grid size-9 place-items-center rounded-xl bg-primary font-display text-lg font-semibold text-primary-foreground shadow-sm"
            aria-hidden="true"
          >
            T
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Taste<span className="text-primary">Palette</span>
          </span>
        </a>

        <SearchField className="mx-auto hidden w-full max-w-md md:block" />

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6 md:hidden">
        <SearchField />
      </div>

      <nav aria-label="Recipe categories" className="mx-auto max-w-7xl px-4 pb-3 sm:px-6 lg:px-8">
        <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          <li>
            <CategoryLink active={category === null} onClick={() => setCategory(null)}>
              All
            </CategoryLink>
          </li>
          {categories.map((c) => (
            <li key={c.value}>
              <CategoryLink
                active={category === c.value}
                onClick={() => setCategory(category === c.value ? null : c.value)}
              >
                {c.label}
              </CategoryLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function CategoryLink({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        active
          ? 'bg-foreground text-background'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
