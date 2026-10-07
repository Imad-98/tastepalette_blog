'use client'

import React, { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">
        <Check className="size-4" aria-hidden="true" />
        {"You're on the list! Check your inbox for a welcome recipe."}
      </p>
    )
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-border sm:bg-background sm:p-1.5 sm:shadow-sm"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          disabled={status === 'loading'}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-11 flex-1 rounded-full border border-border bg-background px-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring/30 disabled:opacity-50 sm:border-0 sm:focus:ring-0"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:gap-3 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Subscribing...
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}