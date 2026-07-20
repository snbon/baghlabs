import {
  HeroBlock,
  SelectedWork,
  PillarGrid,
  ProcessStages,
  CTASection,
} from '../components/sections/Home'

const Home = () => {
  return (
    <div className="bg-noir">
      <HeroBlock />
      <SelectedWork />
      <PillarGrid />
      <ProcessStages />
      <CTASection />
    </div>
  )
}

export default Home
