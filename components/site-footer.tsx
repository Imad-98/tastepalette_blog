import { categories } from '@/lib/recipes'
import { NewsletterForm } from './newsletter-form'

const socials = [
  { name: 'Instagram', icon: '/icons/instagram.svg', href: '#' },
  { name: 'Pinterest', icon: '/icons/pinterest.svg', href: '#' },
  { name: 'YouTube', icon: '/icons/youtube.svg', href: '#' },
  { name: 'TikTok', icon: '/icons/tiktok.svg', href: '#' },
  { name: 'X', icon: '/icons/x.svg', href: '#' },
]

const links = {
  Explore: categories.map((c) => ({ label: c.label, href: `/?category=${c.value}#recipes` })),
  Company: ['About', 'Contact', 'Write for us', 'Privacy'].map((label) => ({ label, href: '#' })),
}

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-accent/60 p-8 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                A new recipe in your inbox, every Sunday.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hand-picked dishes from around the world. No spam, unsubscribe anytime.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-xs">
            <p className="font-display text-xl font-semibold tracking-tight text-foreground">
              Taste<span className="text-primary">Palette</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Everyday recipes inspired by kitchens from Marrakech to Kyoto. Cook boldly, eat well.
            </p>
            <ul className="mt-5 flex gap-2" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.name}
                    className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="size-4 bg-current"
                      style={{
                        maskImage: `url(${s.icon})`,
                        WebkitMaskImage: `url(${s.icon})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <nav key={title} aria-label={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {items.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                        {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} TastePalette. All rights reserved.</p>
          <p>Made with good food and better company.</p>
        </div>
      </div>
    </footer>
  )
}
