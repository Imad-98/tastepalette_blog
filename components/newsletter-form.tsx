'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  if (subscribed) {
    return (
      <p role="status" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">
        <Check className="size-4" aria-hidden="true" />
        {"You're on the list! Check your inbox for a welcome recipe."}
      </p>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email) setSubscribed(true)
      }}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-border sm:bg-background sm:p-1.5 sm:shadow-sm"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-11 flex-1 rounded-full border border-border bg-background px-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring/30 sm:border-0 sm:focus:ring-0"
      />
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:gap-3 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Subscribe
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </form>
  )
}
