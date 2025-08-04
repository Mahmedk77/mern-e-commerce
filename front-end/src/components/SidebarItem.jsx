import { useState } from "react"
import { assets } from "../assets/assets"

const SidebarItem = ({title, text1, text2, text3, showFilter}) => {

  return (
    <>
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className='mb-3 text-sm font-medium'>{title}</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input onClick={() => { }} type="checkbox" className='w-3' value={"Men"} /> {text1}
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={"Women"} /> {text2}
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" className='w-3' value={"Kids"} /> {text3}
              </p>
              
    
            </div>
            </div>
    </>
  )
}

export default SidebarItem
