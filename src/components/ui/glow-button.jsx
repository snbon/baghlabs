import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Retained filename for import compat, but this is now the poster button set.
const glowButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        // Filled oxblood, cream text — the primary CTA button
        solid: 'rounded-sm bg-oxblood text-paper border border-oxblood hover:bg-oxblood-2',
        // Cream on ink (used on the inverted CTA slab)
        paper: 'rounded-sm bg-noir text-paper border border-paper hover:bg-noir-2',
        // Outlined
        outline: 'rounded-sm bg-transparent text-paper border border-paper hover:bg-noir hover:text-paper',
        outlinePaper: 'rounded-sm bg-transparent text-paper border border-paper/50 hover:border-paper hover:bg-noir hover:text-paper',
        // No pill, a typographic mark with underline (the poster CTA)
        poster: 'font-display normal-case tracking-normal text-2xl md:text-3xl text-oxblood hover:text-oxblood-2 border-b-2 border-oxblood pb-1 hover:pb-1.5 hover:border-oxblood-2 rounded-none',
      },
      size: {
        sm: 'h-9 px-4 text-[11px]',
        md: 'h-11 px-5 text-xs',
        lg: 'h-14 px-7 text-sm',
        xl: 'h-16 px-9 text-base',
        poster: 'py-0 px-0 h-auto',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  }
)

const GlowButton = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(glowButtonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
GlowButton.displayName = 'GlowButton'

export { GlowButton, glowButtonVariants }
