import BrandStory from '@/components/landing/BrandStory'
import CategoryGrid from '@/components/landing/CategoryGrid'
import FeaturedProducts from '@/components/landing/FeaturedProducts'
import HeroSection from '@/components/landing/HeroSection'
import Newsletter from '@/components/landing/Newsletter'
import ScentJourney from '@/components/landing/ScentJourney'
import Testimonials from '@/components/landing/Testimonials'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col w-full overflow-hidden'>
      <HeroSection/>
      <ScentJourney />
      <FeaturedProducts/>
      <CategoryGrid/>
      <BrandStory/>
      <Testimonials/>
      <Newsletter/>

      <div>
        
      </div>
    </div>
  )
}

export default page