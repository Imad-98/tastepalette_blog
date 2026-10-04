import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImage } from '@/lib/recipes'
import { dataset, isSanityConfigured, projectId } from './env'

const builder = createImageUrlBuilder({ projectId: isSanityConfigured ? projectId : 'not-configured', dataset })

export function recipeImageUrl(image: SanityImage | null | undefined, width: number, height: number) {
  if (!image?.asset) return '/placeholder.svg'
  return builder.image(image).width(width).height(height).fit('crop').auto('format').quality(80).url()
}
