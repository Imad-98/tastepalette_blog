'use client'

import { Globe } from 'lucide-react'
import { countries } from '@/lib/recipes'
import { cn } from '@/lib/utils'
import { useFilters } from './filters-provider'

export function CountryFilterBar() {
  const { country, setCountry } = useFilters()

  return (
    <section aria-label="Filter by country" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative">
        <div
          className="no-scrollbar flex snap-x items-center gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Countries"
        >
          <button
            type="button"
            onClick={() => setCountry(null)}
            aria-pressed={country === null}
            className={cn(
              'flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              country === null
                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                : 'border-border bg-card text-foreground hover:border-primary/50',
            )}
          >
            <Globe className="size-4" aria-hidden="true" />
            All countries
          </button>
          {countries.map((c) => {
            const active = country === c.code
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setCountry(active ? null : c.code)}
                aria-pressed={active}
                className={cn(
                  'flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  active
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border bg-card text-foreground hover:border-primary/50 hover:shadow-sm',
                )}
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {c.flag}
                </span>
                {c.name}
              </button>
            )
          })}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
