import { CountryFilterBar } from '@/components/country-filter-bar'
import { FiltersProvider } from '@/components/filters-provider'
import { HeroRecipe } from '@/components/hero-recipe'
import { RecipeGrid } from '@/components/recipe-grid'
import { SanitySetupNotice } from '@/components/sanity-setup-notice'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { isCategory, isCountry } from '@/lib/recipes'
import { isSanityConfigured } from '@/sanity/env'
import { getFeaturedRecipe, getRecipes } from '@/sanity/queries'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const filters = {
    q: typeof sp.q === 'string' ? sp.q.slice(0, 80) : '',
    category: isCategory(sp.category) ? sp.category : null,
    country: isCountry(sp.country) ? sp.country : null,
  }

  const [featured, recipes] = await Promise.all([getFeaturedRecipe(), getRecipes(filters)])

  return (
    <FiltersProvider initial={filters}>
      <SiteHeader />
      <main>
        {!isSanityConfigured && <SanitySetupNotice />}
        <CountryFilterBar />
        {featured && <HeroRecipe recipe={featured} />}
        <RecipeGrid recipes={recipes} />
      </main>
      <SiteFooter />
    </FiltersProvider>
  )
}
