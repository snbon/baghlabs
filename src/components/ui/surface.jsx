import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const surfaceVariants = cva(
  'relative rounded-md border transition-all duration-200',
  {
    variants: {
      tone: {
        base: 'bg-noir-2 border-paper/10',
        raised: 'bg-noir-3 border-paper/10',
        flush: 'bg-transparent border-paper/10',
      },
      interactive: {
        true: 'hover:border-neon/50 hover:shadow-glow-sm hover:-translate-y-0.5 cursor-pointer',
        false: '',
      },
      accent: {
        none: '',
        neon: 'shadow-[inset_2px_0_0_0_#B6FF3C]',
        violet: 'shadow-[inset_2px_0_0_0_#C8B4FF]',
      },
    },
    defaultVariants: {
      tone: 'base',
      interactive: false,
      accent: 'none',
    },
  }
)

const Surface = React.forwardRef(({ className, tone, interactive, accent, ...props }, ref) => (
  <div ref={ref} className={cn(surfaceVariants({ tone, interactive, accent }), className)} {...props} />
))
Surface.displayName = 'Surface'

const SurfaceHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center justify-between px-6 py-4 border-b border-paper/10', className)} {...props} />
))
SurfaceHeader.displayName = 'SurfaceHeader'

const SurfaceBody = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 md:p-8', className)} {...props} />
))
SurfaceBody.displayName = 'SurfaceBody'

const SurfaceTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-display font-bold text-2xl md:text-3xl leading-none tracking-brut text-paper', className)} {...props} />
))
SurfaceTitle.displayName = 'SurfaceTitle'

const SurfaceEyebrow = React.forwardRef(({ className, ...props }, ref) => (
  <span ref={ref} className={cn('eyebrow', className)} {...props} />
))
SurfaceEyebrow.displayName = 'SurfaceEyebrow'

export { Surface, SurfaceHeader, SurfaceBody, SurfaceTitle, SurfaceEyebrow, surfaceVariants }
