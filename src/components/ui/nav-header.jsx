import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

function NavHeader({ links, langSwitchLabel, langSwitchHref }) {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })
  const location = useLocation()

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
      onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
    >
      {links.map((link) => (
        <Tab
          key={link.name}
          href={link.href}
          setPosition={setPosition}
          isActive={location.pathname === link.href || (link.href !== '/' && link.href !== '/en' && location.pathname.startsWith(link.href))}
        >
          {link.name}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  )
}

const Tab = ({ children, href, setPosition, isActive }) => {
  const ref = useRef(null)
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      className={cn(
        'relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase tracking-wide md:px-5 md:py-3 md:text-sm',
        'text-white mix-blend-difference font-medium'
      )}
    >
      <Link to={href}>{children}</Link>
    </li>
  )
}

const Cursor = ({ position }) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-7 rounded-full bg-black md:h-12"
  />
)

export default NavHeader
