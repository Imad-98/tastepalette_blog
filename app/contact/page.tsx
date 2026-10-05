'use client'

import React from 'react'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Have a question about a recipe or want to collaborate? Send us a message below.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-8 sm:p-10">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-foreground">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground">Subject</label>
            <input
              type="text"
              placeholder="How can we help?"
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message here..."
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}