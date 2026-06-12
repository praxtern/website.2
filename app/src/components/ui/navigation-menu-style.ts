import { cva } from 'class-variance-authority'

export const navigationMenuTriggerStyle = cva(
  "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
