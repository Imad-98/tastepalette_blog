import { Database } from 'lucide-react'

export function SanitySetupNotice() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div role="status" className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-accent px-4 py-3 text-sm text-accent-foreground">
        <Database className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">Sanity is not connected yet.</span> Add{' '}
          <code className="rounded bg-background/60 px-1 font-mono text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
          <code className="rounded bg-background/60 px-1 font-mono text-xs">NEXT_PUBLIC_SANITY_DATASET</code> in project
          Vars to load recipes from your CMS.
        </p>
      </div>
    </div>
  )
}
