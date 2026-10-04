import type { PortableTextBlock } from 'next-sanity'

export const categories = [
  { value: 'sweet', label: 'Sweet', title: 'Sweet' },
  { value: 'salty', label: 'Salty', title: 'Salty & Savory' },
  { value: 'drinks', label: 'Drinks', title: 'Drinks & Beverages' },
  { value: 'mains', label: 'Mains', title: 'Main Courses' },
  { value: 'salads', label: 'Salads', title: 'Salads & Appetizers' },
] as const
export type CategoryValue = (typeof categories)[number]['value']

export const countries = [
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
] as const
export type CountryCode = (typeof countries)[number]['code']

export const difficulties = [
  { value: 'easy', label: 'Easy', level: 1 },
  { value: 'medium', label: 'Medium', level: 2 },
  { value: 'hard', label: 'Hard', level: 3 },
] as const
export type DifficultyValue = (typeof difficulties)[number]['value']

export const isCategory = (v: unknown): v is CategoryValue =>
  categories.some((c) => c.value === v)
export const isCountry = (v: unknown): v is CountryCode => countries.some((c) => c.code === v)

export const categoryLabel = (v?: string | null) => categories.find((c) => c.value === v)?.label ?? ''
export const countryFor = (code?: string | null) => countries.find((c) => c.code === code)
export const difficultyFor = (v?: string | null) => difficulties.find((d) => d.value === v)

export type SanityImage = {
  asset?: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  lqip?: string | null
}

export type RecipeSummary = {
  _id: string
  title: string
  slug: string
  summary: string | null
  image: SanityImage | null
  category: CategoryValue | null
  country: CountryCode | null
  prepTime: number | null
  cookTime: number | null
  servings: number | null
  difficulty: DifficultyValue | null
}

export type RecipeDetail = RecipeSummary & {
  ingredients: string[] | null
  instructions: PortableTextBlock[] | null
  proTips: string | null
}

export const totalTime = (r: Pick<RecipeSummary, 'prepTime' | 'cookTime'>) =>
  (r.prepTime ?? 0) + (r.cookTime ?? 0)
