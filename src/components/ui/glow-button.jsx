import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glowButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-noir disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        neon: 'bg-neon text-noir border border-neon shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5',
        ghost: 'bg-transparent text-paper border border-paper/15 hover:border-neon/60 hover:text-neon hover:shadow-glow-sm',
        outline: 'bg-transparent text-paper border border-paper/30 hover:bg-paper hover:text-noir',
        subtle: 'bg-noir-3 text-paper border border-paper/10 hover:border-paper/30 hover:bg-noir-4',
      },
      size: {
        sm: 'h-9 px-4 text-[11px]',
        md: 'h-11 px-5 text-xs',
        lg: 'h-14 px-7 text-sm',
        xl: 'h-16 px-9 text-base',
      },
    },
    defaultVariants: {
      variant: 'neon',
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
