import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export function CaseTabs({ activeTab, onTabChange, labels }) {
  const tabs = [
    { value: 'all', label: labels?.all || 'All' },
    { value: 'development', label: labels?.development || 'Software' },
    { value: 'ai', label: labels?.ai || 'AI' },
    { value: 'others', label: labels?.others || 'Other' },
  ]

  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <Tabs.List className="flex items-center justify-start gap-6 md:gap-10 flex-wrap border-b border-paper/15">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'smallcaps pb-3 -mb-px border-b-2 border-transparent transition-colors',
              'text-paper/50 hover:text-oxblood',
              'data-[state=active]:text-oxblood data-[state=active]:border-oxblood'
            )}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
