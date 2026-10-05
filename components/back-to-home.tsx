import Link from 'next/link'

export function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary mb-6"
    >
      <svg
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Home
    </Link>
  )
}