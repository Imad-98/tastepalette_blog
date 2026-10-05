import React from 'react'
import { BackToHome } from '@/components/back-to-home'

export const metadata = {
  title: 'Write for Us | TastePalette',
  description: 'Contribute original recipes and food stories to TastePalette.',
}

export default function WriteForUsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <BackToHome/>
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Write for Taste<span className="text-primary">Palette</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Share your recipes, food stories, and culinary secrets with our growing global community.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-foreground">What We Look For</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We welcome home cooks, food writers, and recipe developers to submit original content:
          </p>

          <ul className="mt-6 flex flex-col gap-3 text-sm text-foreground">
            <li className="flex items-start gap-3">
              <span className="size-2 mt-1.5 rounded-full bg-primary shrink-0" />
              <span><strong>Original Recipes:</strong> Must be thoroughly tested with clear ingredient quantities, step-by-step methods, and precise prep times.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="size-2 mt-1.5 rounded-full bg-primary shrink-0" />
              <span><strong>Authentic Stories:</strong> Cultural background, history, or personal connection behind the dishes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="size-2 mt-1.5 rounded-full bg-primary shrink-0" />
              <span><strong>High Quality Visuals:</strong> Original photography showing ingredients and finished plates.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-accent/60 p-8 text-center sm:p-10">
          <h3 className="font-display text-xl font-semibold text-foreground">Ready to Submit?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Send your recipe proposal and draft ideas directly to our editorial team.
          </p>
          <a
            href="mailto:contact@tastepalette.com"
            className="mt-6 inline-block rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Submit Your Pitch
          </a>
        </div>
      </div>
    </div>
  )
}