import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { NewsLetter } from '../components'

const Razorpay = () => {
  return (
    <>
    <div className='w-full flex flex-col items-center py-12 border-t border-gray-400'>
        <div className='w-[80%] flex justify-center items-center'>
            <img className="w-full sm:w-1/2" src={assets.construction_img} alt="working image at razorpay page" />
        </div>
        <div className='mt-4 flex flex-col items-center gap-4'>
        {/* <p>Please Use a Different Method</p>     */}
        <Link to={'/placeOrders'}>
        <button className='bg-black text-white px-16 py-3 tracking-wider text-sm cursor-pointer'> Redirect </button>
        </Link>
      </div>
    </div>
    <div className='mt-6'>
     <NewsLetter />

    </div>
     </>
  )
}

export default Razorpay
