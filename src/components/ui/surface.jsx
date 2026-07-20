import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const surfaceVariants = cva(
  'relative transition-all duration-200',
  {
    variants: {
      tone: {
        paper: 'bg-noir text-paper',
        raised: 'bg-noir-2 text-paper',
        deep: 'bg-noir-3 text-paper',
        noir: 'bg-noir text-paper',
      },
      frame: {
        none: '',
        ink: 'border border-paper/20 rounded-sm',
        oxblood: 'border border-oxblood rounded-sm',
      },
      interactive: {
        true: 'hover:border-oxblood cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'paper',
      frame: 'none',
      interactive: false,
    },
  }
)

const Surface = React.forwardRef(({ className, tone, frame, interactive, ...props }, ref) => (
  <div ref={ref} className={cn(surfaceVariants({ tone, frame, interactive }), className)} {...props} />
))
Surface.displayName = 'Surface'

export { Surface, surfaceVariants }
