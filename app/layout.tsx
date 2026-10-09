import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
})

const siteUrl = 'https://tastepalette-blog.vercel.app/'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TastePalette - Delicious World Recipes & Culinary Inspiration',
    template: '%s | TastePalette',
  },
  description:
    'Explore easy-to-follow, delicious recipes from around the world. Hand-picked dishes, cooking guides, and weekly culinary tips on TastePalette.',
  applicationName: 'TastePalette',   
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  keywords: ['recipes', 'cooking tips', 'food blog', 'easy recipes', 'TastePalette', 'dinner ideas'],
  authors: [{ name: 'TastePalette Team' }],
  creator: 'TastePalette',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'TastePalette - Delicious World Recipes',
    description: 'Explore easy-to-follow, delicious recipes from around the world.',
    siteName: 'TastePalette',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TastePalette - Delicious World Recipes',
    description: 'Explore easy-to-follow, delicious recipes from around the world.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'gmkNKvBhJQlvYCunIwRtuE5XlinZs8ec44hYJwNjbnQ',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1714' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TastePalette',
    alternateName: ['Taste Palette', 'TastePalette Blog'],
    url: 'https://tastepalette-blog.vercel.app',
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${fraunces.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}