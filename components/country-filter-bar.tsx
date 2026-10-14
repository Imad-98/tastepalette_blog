'use client'

import { useRef, useState, useEffect } from 'react'
import { Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { countries } from '@/lib/recipes'
import { cn } from '@/lib/utils'
import { useFilters } from './filters-provider'

export function CountryFilterBar() {
  const { country, setCountry } = useFilters()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scrollToRecipes = () => {
    const recipesSection = document.getElementById('recipes')
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCountrySelect = (code: string | null) => {
    setCountry(code as any)
    scrollToRecipes()
  }

  const checkForScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    
    setShowLeftArrow(scrollLeft > 10)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkForScroll()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkForScroll)
      window.addEventListener('resize', checkForScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkForScroll)
      }
      window.removeEventListener('resize', checkForScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 300
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section aria-label="Filter by country" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="group relative items-center">
        {showLeftArrow && (
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card/90 p-1.5 text-foreground shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex snap-x items-center gap-2 overflow-x-auto pb-1 scroll-smooth"
          role="group"
          aria-label="Countries"
        >
          <button
            type="button"
            onClick={() => handleCountrySelect(null)}
            aria-pressed={country === null}
            className={cn(
              'flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              country === null
                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                : 'border-border bg-card text-foreground hover:border-primary/50'
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
                onClick={() => handleCountrySelect(active ? null : c.code)}
                aria-pressed={active}
                className={cn(
                  'flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  active
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border bg-card text-foreground hover:border-primary/50 hover:shadow-sm'
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

        {showRightArrow && (
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card/90 p-1.5 text-foreground shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="size-5" />
          </button>
        )}

        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}