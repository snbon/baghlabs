import {
  HeroBlock,
  ProblemBlock,
  PillarGrid,
  ComparisonTable,
  ProcessStages,
  SecurityBlock,
  ScenariosBlock,
  FitBlock,
  CTASection,
} from '../components/sections/Home'

const Home = () => {
  return (
    <div className="bg-noir">
      <HeroBlock />
      <ProblemBlock />
      <PillarGrid />
      <ComparisonTable />
      <ProcessStages />
      <SecurityBlock />
      <ScenariosBlock />
      <FitBlock />
      <CTASection />
    </div>
  )
}

export default Home
