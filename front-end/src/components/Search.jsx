  import React, { useContext, useEffect, useState } from 'react'
  import { assets } from '../assets/assets'
  import { ShopContext } from '../context/ShopContext';
  import { useLocation } from 'react-router-dom';

  const Search = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const {showSearch, setShowSearch, search, setSearch} = useContext(ShopContext);
    // console.log(location.pathname);
    // console.log(search)
  
    useEffect(() => {
    setVisible(location.pathname.includes('/collection'));
    }, [location.pathname]);


    return showSearch && visible ? (
      <div className='flex justify-center items-center gap-4 bg-slate-50 p-5 border-y border-gray-200'>
          <div className='relative'>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className='border-1 border-gray-400 w-[20rem] sm:w-[40rem] rounded-full px-6 py-2 text-sm outline-0' />
          <img src={assets.search_icon} alt="search icon at search bar in collections page" className='w-4 absolute right-4 bottom-[11px]' />
          </div>
          <img onClick={() => setShowSearch(false)} src={assets.cross_icon} alt="cross icon at search bar in collections page" className='h-4 cursor-pointer'/>

      </div>
    ) : null
  }

  export default Search
