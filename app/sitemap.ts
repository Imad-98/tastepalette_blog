import { MetadataRoute } from 'next'
import { client } from '@/sanity/client' // حط المسار الصحيح ديال client عندك

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tastepalette-blog.vercel.app/' 

  // 1. جلب كاع الـ Slugs ديال الوصفات من Sanity أوتوماتيكياً
  const recipes = await client.fetch<Array<{ slug: string; _updatedAt?: string }>>(
    `*[_type == "recipe" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  )

  const recipeUrls: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.slug}`, // تعديل المسار حسب طريقة العرض عندك
    lastModified: recipe._updatedAt ? new Date(recipe._updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 2. الصفحات العادية
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/write-for-us`,    
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  return [...staticPages, ...recipeUrls]
}