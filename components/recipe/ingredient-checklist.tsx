'use client'

import { useState } from 'react'
import { Check, RotateCcw, ShoppingBasket } from 'lucide-react'
import { cn } from '@/lib/utils'

export function IngredientChecklist({ ingredients, servings }: { ingredients: string[]; servings: number | null }) {
  const [checked, setChecked] = useState<Set<number>>(() => new Set())
  const done = checked.size
  const total = ingredients.length
  const progress = total ? Math.round((done / total) * 100) : 0

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section aria-labelledby="ingredients-title" className="rounded-3xl border border-border bg-card p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="ingredients-title" className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-card-foreground">
            <ShoppingBasket className="size-5 text-primary" aria-hidden="true" />
            Ingredients
          </h2>
          {servings ? <p className="mt-1 text-sm text-muted-foreground">For {servings} servings</p> : null}
        </div>
        {done > 0 && (
          <button
            type="button"
            onClick={() => setChecked(new Set())}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span aria-live="polite">
            {done} of {total} gathered
          </span>
          <span>{progress}%</span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Ingredients gathered"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-1">
        {ingredients.map((item, i) => {
          const isChecked = checked.has(i)
          const id = `ingredient-${i}`
          return (
            <li key={id}>
              <label
                htmlFor={id}
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/70 has-focus-visible:ring-3 has-focus-visible:ring-ring/40',
                  isChecked && 'bg-muted/40',
                )}
              >
                <input id={id} type="checkbox" checked={isChecked} onChange={() => toggle(i)} className="peer sr-only" />
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 transition-all',
                    isChecked ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background',
                  )}
                >
                  <Check className={cn('size-3.5 transition-transform', isChecked ? 'scale-100' : 'scale-0')} strokeWidth={3} />
                </span>
                <span
                  className={cn(
                    'text-sm leading-relaxed transition-colors',
                    isChecked ? 'text-muted-foreground line-through decoration-primary/60' : 'text-foreground',
                  )}
                >
                  {item}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
