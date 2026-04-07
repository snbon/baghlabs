import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

function RevealImageListItem({ text, images, href }) {
  const container = 'absolute right-8 -top-1 z-40 h-20 w-16'
  const effect = 'relative duration-500 delay-100 shadow-none group-hover:shadow-xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-16 h-16 overflow-hidden transition-all rounded-md'

  return (
    <Link to={href} className="group relative h-fit w-fit overflow-visible py-6 block">
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground transition-all duration-500 group-hover:opacity-40">
        {text}
      </h2>
      <div className={container}>
        <div className={effect}>
          <img alt="" src={images[1]} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className={cn(container, 'translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-12')}>
        <div className={cn(effect, 'duration-200')}>
          <img alt="" src={images[0]} className="h-full w-full object-cover" />
        </div>
      </div>
    </Link>
  )
}

export function RevealImageList({ items, title }) {
  return (
    <div className="flex flex-col gap-1 px-4 md:px-8 py-4">
      {title && <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">{title}</h3>}
      {items.map((item, index) => (
        <RevealImageListItem key={index} text={item.text} images={item.images} href={item.href} />
      ))}
    </div>
  )
}
