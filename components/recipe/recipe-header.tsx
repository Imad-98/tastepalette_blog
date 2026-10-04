import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChefHat, Clock, Flame, Timer, Users } from 'lucide-react'
import { categoryLabel, countryFor, difficultyFor, totalTime, type RecipeDetail } from '@/lib/recipes'
import { cn } from '@/lib/utils'
import { recipeImageUrl } from '@/sanity/image'

export function RecipeHeader({ recipe }: { recipe: RecipeDetail }) {
  const country = countryFor(recipe.country)
  const difficulty = difficultyFor(recipe.difficulty)
  const total = totalTime(recipe)
  const lqip = recipe.image?.lqip ?? undefined

  const times = [
    { icon: Timer, label: 'Prep', value: recipe.prepTime },
    { icon: Flame, label: 'Cook', value: recipe.cookTime },
    { icon: Clock, label: 'Total', value: total || null, highlight: true },
  ].filter((t) => t.value != null)

  return (
    <header className="flex flex-col gap-8">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 -ml-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All recipes
      </Link>

      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="flex flex-col gap-5 lg:order-1">
          <div className="flex flex-wrap items-center gap-2">
            {country && (
              <Link
                href={`/?country=${country.code}#recipes`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50"
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {country.flag}
                </span>
                {country.name}
              </Link>
            )}
            {recipe.category && (
              <Link
                href={`/?category=${recipe.category}#recipes`}
                className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-80"
              >
                {categoryLabel(recipe.category)}
              </Link>
            )}
          </div>

          <h1 className="font-display text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            {recipe.title}
          </h1>
          {recipe.summary && <p className="text-lg leading-relaxed text-pretty text-muted-foreground">{recipe.summary}</p>}

          <ul className="flex flex-wrap gap-2" aria-label="Cooking times">
            {times.map(({ icon: Icon, label, value, highlight }) => (
              <li
                key={label}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm',
                  highlight ? 'bg-primary text-primary-foreground shadow-sm' : 'border border-border bg-card text-foreground',
                )}
              >
                <Icon className={cn('size-4', !highlight && 'text-primary')} aria-hidden="true" />
                <span className={cn(!highlight && 'text-muted-foreground')}>{label}</span>
                <span className="font-semibold">{value} min</span>
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-3 sm:max-w-sm">
            <div className="rounded-2xl bg-muted/70 p-4">
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="size-4 text-primary" aria-hidden="true" />
                Servings
              </dt>
              <dd className="mt-1 font-semibold text-foreground">{recipe.servings ?? '—'}</dd>
            </div>
            <div className="rounded-2xl bg-muted/70 p-4">
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ChefHat className="size-4 text-primary" aria-hidden="true" />
                Difficulty
              </dt>
              <dd className="mt-1 flex items-center gap-2 font-semibold text-foreground">
                {difficulty && (
                  <span className="flex gap-0.5" aria-hidden="true">
                    {[1, 2, 3].map((i) => (
                      <span key={i} className={cn('h-3 w-1.5 rounded-full', i <= difficulty.level ? 'bg-primary' : 'bg-border')} />
                    ))}
                  </span>
                )}
                {difficulty?.label ?? '—'}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-[0_12px_40px_-12px_rgb(0_0_0/0.2)] lg:order-2">
          <Image
            src={recipeImageUrl(recipe.image, 1400, 1050)}
            alt={recipe.title}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            placeholder={lqip ? 'blur' : 'empty'}
            blurDataURL={lqip}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  )
}
