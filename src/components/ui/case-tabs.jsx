import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export function CaseTabs({ activeTab, onTabChange, labels }) {
  const tabs = [
    { value: 'all', label: labels?.all || 'All' },
    { value: 'development', label: labels?.development || 'Development' },
    { value: 'branding-content', label: labels?.brandingContent || 'Branding & Content' },
    { value: 'performance-marketing', label: labels?.performanceMarketing || 'Performance Marketing' },
  ]

  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <Tabs.List className="flex items-center justify-start gap-1 md:gap-2 flex-wrap">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200',
              'text-muted-foreground border-border hover:text-foreground hover:border-foreground',
              'data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:border-foreground'
            )}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
