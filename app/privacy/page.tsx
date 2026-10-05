import React from 'react'
import { BackToHome } from '@/components/back-to-home'

export const metadata = {
  title: 'Privacy Policy | TastePalette',
  description: 'TastePalette Privacy Policy regarding user data protection and cookie policies.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <BackToHome/>
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: October 2026</p>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-8 sm:p-10">
        <div className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-2">
              Welcome to TastePalette. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect and manage user data across our platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">2. Information We Collect</h2>
            <p className="mt-2">
              We collect minimal personal information necessary to deliver quality content and services:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>Email address when signing up for our weekly newsletter.</li>
              <li>Name and contact information submitted voluntarily via our contact form.</li>
              <li>Standard website usage data and browser analytics to optimize platform speed.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">3. Cookies & Advertising</h2>
            <p className="mt-2">
              TastePalette uses standard cookies and web beacons to enhance site performance and analyze user traffic. Third-party partners, including Google AdSense, may place cookies on your browser to serve relevant advertisements based on past visits.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-foreground">4. Contact Us</h2>
            <p className="mt-2">
              If you have any questions regarding this Privacy Policy, please get in touch via our Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}