import { HeroParallax } from '@/components/ui/hero-parallax'
import React from 'react'
import HomePage from './hero-section/page'
import SoftwareShowcase from '@/components/HomeComponents/CutoutCard'
import AboutPage from './about/page'

const page = () => {
  return (
    <div>
      <HomePage/>
      <SoftwareShowcase/>
      {/* <AboutPage/> */}
    </div>
  )
}

export default page

