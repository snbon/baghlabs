import { HeroSection, StorySection, NetworkSection, TestimonialsSection } from '../components/sections/About'
import { CTASection } from '../components/sections/Home'
import BackgroundPage from '@/components/ui/background-page'

const About = () => {
  return (
    <div>
      <HeroSection />
      <div className="relative overflow-hidden">
        <BackgroundPage />
        <StorySection />
        <NetworkSection />
        <TestimonialsSection />
      </div>
      <CTASection />
    </div>
  )
}

export default About
