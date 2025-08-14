import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { RelatedProducts } from '../components';

const Product = () => {
  
  // const { id } = useParams();
  const { id } = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductsData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {

    products.map((item) => {
      if(item._id === id) {
        setProductsData(item);
        setImage(item.image[0])
        return null;
      }
    })

  }
  
  useEffect(()=>{
    fetchProductData();
  }, [id])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);


  console.log(id)
  return productData ?  (
    <div  className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
    {/*-----------------------------------------------------Product Data----------------------------------------------------------------------------------- */}
    <div  className='flex gap-12 flex-col sm:flex-row'>
    {/*-----------------------------------------------------Product Images----------------------------------------------------------------------------------- */}
      <div  className='flex flex-1 flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {
            productData.image.map((item, idx) => (
              <img onClick={()=>setImage(item)} src={item} alt="related images of product" key={idx} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            ))
          }
        </div>
        <div className='w-full sm:w-[80%]'>
          <img src={image} alt="display image at products page"  className='w-full h-auto'/>
        </div>
      </div>
        {/* ------------------------Product Info---------------------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'> {productData.name} </h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="w-3 5" />
            <img src={assets.star_icon} alt="w-3 5" />
            <img src={assets.star_icon} alt="w-3 5" />
            <img src={assets.star_icon} alt="w-3 5" />
            <img src={assets.star_dull_icon} alt="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'> {currency}{productData.price} </p>
          <p className='mt-5 text-gray-500 md:w-4/5'> {productData.description} </p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, idx) => ( //item here are only S,M,L
                <button onClick={()=>setSize(item)} className={`cursor-pointer border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ""}`} key={idx}> {item} </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='cursor-pointer bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
    </div>
      {/*------------------Description & Review------------------------  */}
    <div className='mt-20'>
      <div className='flex'>
        <b className='border py-3 px-5 text-sm'>Description</b>
        <p className='border py-3 px-5 text-sm'>Reviews (122)</p>
      </div>
      <div className='flex flex-col gap-4 border p-6 text-sm text-gray-500'>
        <p>Designed with precision and built for performance, our product empowers you to do more with less. Whether you're organizing tasks or scaling operations, everything is optimized to help you achieve your goals faster and smarter.</p>
        <p>From concept to execution, we offer a full suite of services tailored to meet your unique needs. Whether it's web development, brand identity, or strategic consulting — we're here to elevate your business every step of the way.</p>
      </div>
    </div>
    {/*-------------------------Related Products---------------------------- */}
    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
