import React from 'react'

export const metadata = {
  title: 'About Us | TastePalette',
  description: 'Learn more about TastePalette and our passion for authentic, everyday recipes.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          About Taste<span className="text-primary">Palette</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Everyday recipes inspired by kitchens from Marrakech to Kyoto. Cook cheaply, eat well.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-foreground">Welcome to TastePalette</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            TastePalette was born out of a simple passion: making home cooking approachable, exciting, and deeply flavorful. From traditional Moroccan tagines passed down through generations to quick weeknight fusion dishes, our platform brings world-class recipes straight to your kitchen.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground">Tested & Trusted</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Every recipe published on TastePalette is carefully crafted with clear measurements, reliable prep times, and step-by-step guidance to ensure failure-proof cooking.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground">Global Inspiration</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We celebrate culinary heritage and flavor diversity, highlighting regional spices, techniques, and authentic background stories behind every dish.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-accent/60 p-8 text-center sm:p-10">
          <p className="font-display text-xl font-medium italic text-foreground">
            "Food is an art, a memory, and a bridge between cultures. We are here to help you paint your canvas."
          </p>
        </div>
      </div>
    </div>
  )
}