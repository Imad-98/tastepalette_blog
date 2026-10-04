import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChefHat, Clock, Sparkles, Users } from 'lucide-react'
import { categoryLabel, countryFor, difficultyFor, totalTime, type RecipeSummary } from '@/lib/recipes'
import { recipeImageUrl } from '@/sanity/image'

export function HeroRecipe({ recipe: r }: { recipe: RecipeSummary }) {
  const country = countryFor(r.country)
  const lqip = r.image?.lqip ?? undefined
  const total = totalTime(r)

  return (
    <section aria-labelledby="featured-title" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <article className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_40px_-12px_rgb(0_0_0/0.12)] lg:grid-cols-[1.25fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px]">
          <Image
            src={recipeImageUrl(r.image, 1600, 1100)}
            alt={r.title}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            placeholder={lqip ? 'blur' : 'empty'}
            blurDataURL={lqip}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-md">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Recipe of the day
            </span>
          </div>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {r.prepTime != null && (
              <Badge>
                <Clock className="size-3.5 text-primary" aria-hidden="true" />
                {r.prepTime} min prep
              </Badge>
            )}
            {country && (
              <Badge>
                <span aria-hidden="true">{country.flag}</span>
                {country.name}
              </Badge>
            )}
            {r.category && <Badge>{categoryLabel(r.category)}</Badge>}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Featured &middot; {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </p>
          <h1
            id="featured-title"
            className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-card-foreground sm:text-4xl lg:text-5xl"
          >
            {r.title}
          </h1>
          {r.summary && <p className="leading-relaxed text-pretty text-muted-foreground">{r.summary}</p>}

          <dl className="grid grid-cols-3 gap-3">
            <Stat icon={<Clock className="size-4" aria-hidden="true" />} label="Total" value={total ? `${total} min` : '—'} />
            <Stat
              icon={<ChefHat className="size-4" aria-hidden="true" />}
              label="Level"
              value={difficultyFor(r.difficulty)?.label ?? '—'}
            />
            <Stat icon={<Users className="size-4" aria-hidden="true" />} label="Serves" value={r.servings ? `${r.servings}` : '—'} />
          </dl>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/recipe/${r.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:gap-3 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Cook this recipe
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="#recipes"
              className="rounded-full px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Browse more
            </a>
          </div>
        </div>
      </article>
    </section>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur-md">
      {children}
    </span>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/70 p-3 sm:p-4">
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground sm:text-base">{value}</dd>
    </div>
  )
}
