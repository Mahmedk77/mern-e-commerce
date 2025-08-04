import React from 'react'
import { BestSeller, Hero, OurPolicy, LatestCollection, NewsLetter } from '../components'


const Home = () => {
  return (
    <>
      <Hero/>
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </>
  )
}

export default Home
