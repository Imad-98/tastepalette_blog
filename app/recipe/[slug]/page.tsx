import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FiltersProvider } from '@/components/filters-provider'
import { IngredientChecklist } from '@/components/recipe/ingredient-checklist'
import { RecipeHeader } from '@/components/recipe/recipe-header'
import { RecipeSteps } from '@/components/recipe/recipe-steps'
import { RecipeCard } from '@/components/recipe-card'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { countryFor } from '@/lib/recipes'
import { recipeImageUrl } from '@/sanity/image'
import { getRecipeBySlug, getRecipeSlugs, getRelatedRecipes } from '@/sanity/queries'

type Params = Promise<{ slug: string }>

export const revalidate = 60

function extractText(val: any): string {
  if (!val) return ''
  if (typeof val === 'string') return val.trim()
  if (typeof val === 'number') return String(val)
  if (Array.isArray(val)) {
    return val.map(extractText).filter(Boolean).join(' ')
  }
  if (typeof val === 'object') {
    return Object.entries(val)
      .filter(([key]) => !key.startsWith('_'))  
      .map(([_, v]) => extractText(v))
      .filter(Boolean)
      .join(' ')
  }
  return ''
}

function formatIsoDuration(minutes?: number | string): string | undefined {
  if (!minutes) return undefined
  const mins = typeof minutes === 'string' ? parseInt(minutes, 10) : minutes
  if (isNaN(mins) || mins <= 0) return undefined
  return `PT${mins}M`
}

export async function generateStaticParams() {
  const slugs = await getRecipeSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)
  if (!recipe) return { title: 'Recipe not found | TastePalette' }

  const imageUrl = recipe.image?.asset ? recipeImageUrl(recipe.image, 1200, 630) : undefined

  return {
    title: `${recipe.title} | TastePalette`,
    description: recipe.summary ?? undefined,
    openGraph: {
      title: `${recipe.title} | TastePalette`,
      description: recipe.summary ?? undefined,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: recipe.title }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${recipe.title} | TastePalette`,
      description: recipe.summary ?? undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function RecipePage({ params }: { params: Params }) {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)
  if (!recipe) notFound()

  const related = await getRelatedRecipes(recipe)
  const ingredients = recipe.ingredients ?? []
  const country = countryFor(recipe.country)

  const imageUrl = recipe.image?.asset ? recipeImageUrl(recipe.image, 1200, 630) : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    image: imageUrl ? [imageUrl] : [],
    description: recipe.summary ?? undefined,
    prepTime: formatIsoDuration((recipe as any).prepTime ?? (recipe as any).prepMinutes),
    cookTime: formatIsoDuration((recipe as any).cookTime ?? (recipe as any).cookMinutes),
    totalTime: formatIsoDuration(
      (recipe as any).totalTime ??
        (recipe as any).totalMinutes ??
        ((Number((recipe as any).prepTime || (recipe as any).prepMinutes) || 0) +
          (Number((recipe as any).cookTime || (recipe as any).cookMinutes) || 0))
    ),
    recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,
    recipeCategory: 'Main Course',
    recipeCuisine: country?.name || 'International',
    author: {
      '@type': 'Organization',
      name: 'TastePalette',
    },
    recipeIngredient: ingredients.map((ing: any) =>
      typeof ing === 'string'
        ? ing
        : [ing.amount, ing.unit, ing.name || ing.ingredient].filter(Boolean).join(' ') || String(ing)
    ),
    recipeInstructions: (recipe.instructions ?? []).map((step: any, index: number) => {
      const rawText = extractText(step)

      return {
        '@type': 'HowToStep',
        name: `Step ${index + 1}`,
        text: rawText || `Step ${index + 1}`,
        position: index + 1,
      }
    }),
  }

  return (
    <FiltersProvider liveSearch={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <RecipeHeader recipe={recipe} />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-36 lg:self-start">
            {ingredients.length > 0 ? (
              <IngredientChecklist ingredients={ingredients} servings={recipe.servings} />
            ) : (
              <p className="rounded-3xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                No ingredients listed yet.
              </p>
            )}
          </aside>
          <RecipeSteps steps={recipe.instructions ?? []} proTips={recipe.proTips} />
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mt-20">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Keep cooking</p>
            <h2 id="related-title" className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
              {country ? `More flavors like ${country.name}` : 'You might also like'}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RecipeCard key={r._id} recipe={r} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </FiltersProvider>
  )
}