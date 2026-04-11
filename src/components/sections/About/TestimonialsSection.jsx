import { useTranslation } from 'react-i18next'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import testimonials from '@/data/testimonials.json'

const TestimonialsSection = () => {
  const { t } = useTranslation('about')

  return (
    <AnimatedTestimonials
      title={t('testimonials.title')}
      subtitle={t('testimonials.subtitle')}
      badgeText={t('testimonials.badge')}
      testimonials={testimonials}
    />
  )
}

export default TestimonialsSection
