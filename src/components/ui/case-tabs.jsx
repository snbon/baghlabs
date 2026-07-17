import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export function CaseTabs({ activeTab, onTabChange, labels }) {
  const tabs = [
    { value: 'all', label: labels?.all || 'All' },
    { value: 'development', label: labels?.development || 'Software Development' },
    { value: 'ai', label: labels?.ai || 'AI Systems' },
    { value: 'others', label: labels?.others || 'Other' },
  ]

  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <Tabs.List className="flex items-center justify-start gap-2 flex-wrap">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'px-4 md:px-5 py-2.5 font-mono text-[10px] md:text-xs uppercase tracking-widest border rounded-md transition-all duration-150',
              'border-paper/15 bg-noir-2 text-paper/60 hover:text-paper hover:border-paper/40',
              'data-[state=active]:border-neon data-[state=active]:text-neon data-[state=active]:shadow-glow-sm data-[state=active]:bg-noir-3'
            )}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
