import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity'
import { Lightbulb, ListOrdered } from 'lucide-react'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="leading-relaxed text-pretty text-foreground/90">{children}</p>,
    h2: ({ children }) => <p className="font-semibold text-foreground">{children}</p>,
    h3: ({ children }) => <p className="font-semibold text-foreground">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-primary underline underline-offset-4" rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-1 pl-5 text-foreground/90">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-1 pl-5 text-foreground/90">{children}</ol>,
  },
}

export function RecipeSteps({ steps, proTips }: { steps: PortableTextBlock[]; proTips: string | null }) {
  return (
    <section aria-labelledby="steps-title">
      <h2 id="steps-title" className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        <ListOrdered className="size-6 text-primary" aria-hidden="true" />
        Instructions
      </h2>

      {steps.length > 0 ? (
        <ol className="mt-8 flex flex-col">
          {steps.map((block, i) => (
            <li key={block._key ?? i} className="group relative flex gap-5 pb-8 last:pb-0">
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute top-11 bottom-2 left-5 w-px -translate-x-1/2 bg-border" />
              )}
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display text-base font-semibold text-primary-foreground shadow-sm"
              >
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-border bg-card p-5 transition-shadow group-hover:shadow-[0_12px_30px_-16px_rgb(0_0_0/0.18)]">
                <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-primary uppercase">Step {i + 1}</p>
                <PortableText value={[block]} components={components} />
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-6 text-muted-foreground">Instructions are coming soon.</p>
      )}

      {proTips && (
        <aside className="mt-10 flex gap-4 rounded-3xl border border-primary/30 bg-accent p-6 text-accent-foreground">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Lightbulb className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold">Chef&apos;s pro tips</h3>
            <p className="mt-1 leading-relaxed text-pretty whitespace-pre-line">{proTips}</p>
          </div>
        </aside>
      )}
    </section>
  )
}
