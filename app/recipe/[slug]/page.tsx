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

export async function generateStaticParams() {
  const slugs = await getRecipeSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)
  if (!recipe) return { title: 'Recipe not found | TastePalette' }
  return {
    title: `${recipe.title} | TastePalette`,
    description: recipe.summary ?? undefined,
    openGraph: {
      title: recipe.title,
      description: recipe.summary ?? undefined,
      images: recipe.image?.asset ? [recipeImageUrl(recipe.image, 1200, 630)] : undefined,
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

  return (
    <FiltersProvider liveSearch={false}>
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
