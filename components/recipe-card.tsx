'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Bookmark, Clock } from 'lucide-react'
import { categoryLabel, countryFor, difficultyFor, totalTime, type RecipeSummary } from '@/lib/recipes'
import { cn } from '@/lib/utils'
import { recipeImageUrl } from '@/sanity/image'

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  const [saved, setSaved] = useState(false)
  const country = countryFor(recipe.country)
  const difficulty = difficultyFor(recipe.difficulty)
  const minutes = totalTime(recipe)
  const lqip = recipe.image?.lqip ?? undefined

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgb(0_0_0/0.18)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={recipeImageUrl(recipe.image, 800, 600)}
          alt={recipe.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder={lqip ? 'blur' : 'empty'}
          blurDataURL={lqip}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {(country || recipe.category) && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur-md">
            {country && <span aria-hidden="true">{country.flag}</span>}
            {categoryLabel(recipe.category) || country?.name}
          </span>
        )}
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${recipe.title} from bookmarks` : `Bookmark ${recipe.title}`}
          className={cn(
            'absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full shadow-sm backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60 active:scale-90',
            saved ? 'bg-primary text-primary-foreground' : 'bg-white/90 text-neutral-900 hover:bg-white',
          )}
        >
          <Bookmark className={cn('size-4', saved && 'fill-current')} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl leading-snug font-semibold tracking-tight text-balance text-card-foreground">
          <Link
            href={`/recipe/${recipe.slug}`}
            className="transition-colors after:absolute after:inset-0 after:rounded-3xl hover:text-primary focus-visible:outline-none focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {recipe.title}
          </Link>
        </h3>
        {recipe.summary && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{recipe.summary}</p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-foreground">
            <Clock className="size-4 text-primary" aria-hidden="true" />
            {minutes > 0 ? `${minutes} min` : '—'}
          </span>
          {difficulty && (
            <span className="inline-flex items-center gap-2 text-foreground">
              <span className="flex gap-0.5" aria-hidden="true">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={cn('h-3 w-1.5 rounded-full', i <= difficulty.level ? 'bg-primary' : 'bg-border')}
                  />
                ))}
              </span>
              <span>
                <span className="sr-only">Difficulty: </span>
                {difficulty.label}
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
