import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets.js'
import { Link, NavLink } from 'react-router'
import { ShopContext } from '../context/ShopContext.jsx'
const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const {setShowSearch, getCartCount, token}  = useContext(ShopContext)
  return (
    <div className='flex items text-center justify-between py-5 font-medium'>
        <Link to={'/'}>
        <img src={assets.logo} alt="Store Logo Image" className='w-36' />
        </Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to={'/'} className="flex flex-col items-center justify-center ">
                <p>HOME</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
             <NavLink to={'/collection'} className="flex flex-col items-center justify-center ">
                <p>COLLECTIONS</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
             <NavLink to={'/about'} className="flex flex-col items-center justify-center ">
                <p>ABOUT</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
             <NavLink to={'/contact'} className="flex flex-col items-center justify-center ">
                <p>CONTACT</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden`}/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
            <Link to={'/collection'}>
            <img onClick={()=>setShowSearch((prev)=>!prev)} src={assets.search_icon} alt="search icon image"  className='w-5 cursor-pointer'/>
            </Link>
            <div className='group relative'>
                <Link to={`${token === "" ? "/login" : "/" }`}>
                <img src={assets.profile_icon} alt="profile icon image" className='w-5 cursor-pointer'/>
                </Link>
                <div className='group-hover:block hidden  absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col justify-center items-center bg-slate-100 gap-2 w-36 px-5 py-3 rounded-md  text-gray-700'>
                        <p className='hover:text-black cursor-pointer'>Profile</p>
                        <p className='hover:text-black cursor-pointer'>Orders</p>
                        <p className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            <Link to={'/cart'} className='relative'>
            <img src={assets.cart_icon} alt="shopping cart icon" className='w-5 h-5' />
            <p className='absolute right-[-5px] bottom-[-5px] bg-black w-4 text-center rounded-full text-white leading-4 aspect-square text-[8px]'> {getCartCount()} </p>
            </Link>
        <img src={assets.menu_icon} alt="menu icon image" onClick={()=>setVisible(true)} className='w-5 h-5 cursor-pointer sm:hidden'/>
        </div>

        <div  className={`absolute  top-0 bottom-0 right-0 py-5 overflow-hidden bg-white transition-all text-black ${visible ? 'w-full':'w-0'} z-200`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img src={assets.dropdown_icon} alt="back button icon" className='h-4 rotate-180' />
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>{setVisible(false)}} to={'/'} className={`py-2 pl-6 border`} >HOME</NavLink>
                <NavLink onClick={()=>{setVisible(false)}} to={'/about'} className={`py-2 pl-6 border`}>ABOUT</NavLink>
                <NavLink onClick={()=>{setVisible(false)}} to={'/collection'} className={`py-2 pl-6 border`}>COLLECTIONS</NavLink>
                <NavLink onClick={()=>{setVisible(false)}} to={'/contact'} className={`py-2 pl-6 border`}>CONTACT</NavLink>
            </div>    
      </div>
        
    </div>
    
  )
}

export default Navbar
