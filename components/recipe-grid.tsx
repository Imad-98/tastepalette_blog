'use client'

import { SearchX } from 'lucide-react'
import { categoryLabel, countryFor, type RecipeSummary } from '@/lib/recipes'
import { cn } from '@/lib/utils'
import { useFilters } from './filters-provider'
import { RecipeCard } from './recipe-card'

export function RecipeGrid({ recipes }: { recipes: RecipeSummary[] }) {
  const { query, category, country, reset, isPending } = useFilters()
  const c = countryFor(country)
  const hasFilters = Boolean(query.trim() || category || country)

  const activeLabel = [c && `${c.flag} ${c.name}`, categoryLabel(category)].filter(Boolean).join(' · ')

  return (
    <section id="recipes" aria-labelledby="recipes-title" className="mx-auto max-w-7xl scroll-mt-36 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Fresh this week</p>
          <h2 id="recipes-title" className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Latest recipes
          </h2>
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {isPending
            ? 'Loading…'
            : `${activeLabel ? `${activeLabel} — ` : ''}${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}`}
        </p>
      </div>

      {recipes.length > 0 ? (
        <div
          aria-busy={isPending}
          className={cn('grid gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-3', isPending && 'opacity-60')}
        >
          {recipes.map((r) => (
            <RecipeCard key={r._id} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
            <SearchX className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold text-foreground">
              {hasFilters ? 'No recipes match your filters' : 'No recipes published yet'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {hasFilters
                ? 'Try a different country, category or search term.'
                : 'Publish a recipe in Sanity Studio and it will appear here.'}
            </p>
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </section>
  )
}
