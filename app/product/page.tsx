import { HeroParallax } from '@/components/ui/hero-parallax'
import React from 'react'
// import HomePage from './hero-section/page'
import HeroParallaxDemo from './hero-section/page'
import SoftwareShowcase from './our-product/page'
import AboutPage from './about/page'
// import { BentoDemo } from '@/components/ui/bento-grid'
import FeaturesSection from './feature-section/page'
import TestimonialsSection from './testimonials-section/page'
import ContactSection from '@/components/HomeComponents/ContactForm'

const page = () => {
  return (
    <div>
      <HeroParallaxDemo/>
      {/* <SoftwareShowcase/> */}
      <SoftwareShowcase/>
      <AboutPage/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <ContactSection/>
    </div>
  )
}

export default page

