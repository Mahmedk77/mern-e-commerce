import { assets } from "../assets/assets"

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className='flex items-center justify-center w-full sm:w-1/2 py-10 sm:py-0 gap-4 '>
            <div className="text-[#414141]">
              <div className="flex items-center gap-2">
              <p className='w-8 h-[2px] sm:w-11 bg-[#414141]'></p>
              <p className="font-medium text-sm md:text-base">OUR BEST SELLERS</p>
              </div>
              <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed prata-regular">Latest Arrivals </h1>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                <p className="w-8 h-[2px] sm:w-11 bg-[#414141]"></p>
              </div>
              </div>
        </div>
        {/* Hero Right Side */}
        
        <img src={assets.hero_img} alt="Homepage Hero-section Image" className="w-full sm:w-1/2"/>


    </div>

  )
}

export default Hero
