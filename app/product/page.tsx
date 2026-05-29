import { HeroParallax } from '@/components/ui/hero-parallax'
import React from 'react'
import HomePage from './hero-section/page'
import SoftwareShowcase from '@/components/HomeComponents/CutoutCard'
import AboutPage from './about/page'
// import { BentoDemo } from '@/components/ui/bento-grid'
import FeaturesSection from './feature-section/page'

const page = () => {
  return (
    <div>
      <HomePage/>
      <SoftwareShowcase/>
      <AboutPage/>
      <FeaturesSection/>
    </div>
  )
}

export default page

