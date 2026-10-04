import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, isSanityConfigured, projectId } from './env'

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'not-configured',
  dataset,
  apiVersion,
  useCdn: true,
})

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = ['recipe'],
  fallback,
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
  fallback: T
}): Promise<T> {
  if (!isSanityConfigured) return fallback
  try {
    return (await client.fetch<T>(query, params, { next: { revalidate, tags } })) ?? fallback
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return fallback
  }
}
