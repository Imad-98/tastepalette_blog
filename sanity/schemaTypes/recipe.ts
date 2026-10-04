import { categories, countries, difficulties } from '../../lib/recipes'

type Rule = { required: () => Rule; min: (n: number) => Rule; max: (n: number) => Rule }

const recipe = {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Feature as Recipe of the Day',
      description: 'The most recently updated featured recipe is shown in the homepage hero.',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'summary',
      title: 'Short Summary / SEO Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Main Food Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: categories.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
    },
    {
      name: 'country',
      title: 'Country Origin',
      type: 'string',
      options: {
        list: countries.map(({ code, name, flag }) => ({ title: `${flag} ${name}`, value: code })),
      },
    },
    { name: 'prepTime', title: 'Prep Time (minutes)', type: 'number', validation: (rule: Rule) => rule.min(0) },
    { name: 'cookTime', title: 'Cook Time (minutes)', type: 'number', validation: (rule: Rule) => rule.min(0) },
    { name: 'servings', title: 'Servings', type: 'number', validation: (rule: Rule) => rule.min(1) },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: difficulties.map(({ label, value }) => ({ title: label, value })),
        layout: 'radio',
      },
    },
    {
      name: 'ingredients',
      title: 'Ingredients List',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'instructions',
      title: 'Preparation Steps',
      description: 'Each paragraph is rendered as one numbered step.',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'proTips',
      title: 'Chef Pro Tips',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', country: 'country', category: 'category' },
    prepare({ title, media, country, category }: Record<string, unknown>) {
      const c = countries.find((x) => x.code === country)
      return { title, media, subtitle: [c && `${c.flag} ${c.name}`, category].filter(Boolean).join(' · ') }
    },
  },
}

export default recipe
