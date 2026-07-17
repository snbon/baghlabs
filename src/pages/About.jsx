import { HeroSection, StorySection, NetworkSection, TestimonialsSection } from '../components/sections/About'
import { CTASection } from '../components/sections/Home'

const About = () => {
  return (
    <div className="bg-noir text-paper">
      <HeroSection />
      <StorySection />
      <NetworkSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

export default About
