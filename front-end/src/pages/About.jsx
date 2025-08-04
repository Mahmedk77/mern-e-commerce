import React from 'react'
import { NewsLetter, Title } from '../components'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'> 
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about image a about section" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>At our core, we believe fashion is more than just clothing — it's a powerful form of self-expression. Our brand blends modern aesthetics with timeless styles, offering apparel that speaks to individuality and confidence. From casual essentials to statement pieces, each item in our collection is designed to elevate your wardrobe effortlessly.</p>
            <p>We source premium fabrics and work with skilled artisans to ensure every product meets the highest standards of quality and comfort. Whether you're dressing up for a night out or curating your daily look, our clothes are made to move with you — durable, breathable, and always in style.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our mission is to redefine fashion retail by making high-quality, stylish clothing accessible to everyone. We're here to build a community where creativity, inclusivity, and sustainability come together — because great fashion shouldn't come at the cost of people or the planet.</p>
          </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600' >We handpick premium materials and subject every product to rigorous quality checks to ensure it not only looks good but lasts long. </p>
        </div>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600' >From smooth navigation to secure checkout, our online store is designed for a seamless shopping experience.</p>
        </div>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Execeptional Customer Service:</b>
          <p className='text-gray-600' >Our dedicated support team is always here to help — whether you need sizing advice, order updates, or styling tips.</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default About
