import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import {ProductsItem, Title} from './'

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(()=>{
        if(products){
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSeller(bestProduct.slice(0,5));
        }
       
    }, [products])
  return (
   <div className='my-10'>
    <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Embrace the beauty of being — wear what makes you feel confident. Let your style reflect the light within.
        </p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestSeller.length > 0 
            && bestSeller.map((item,idx) => {
                const { bestseller } = item;
                return (
                    bestseller && <ProductsItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price} />
                )
            })
        }
    </div>
  </div>)
}

export default BestSeller
