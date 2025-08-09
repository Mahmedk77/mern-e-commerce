import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
// import Title from "./Title"
// import ProductsItem from "./";
import {Title, ProductsItem, BestSeller} from './'



const LastestCollections = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    }, [products])
    // console.log(products)
  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Embrace the beauty of being — wear what makes you feel confident. Let your style reflect the light within.
        </p>
        </div>
        {/* Rendring Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            latestProducts.length > 0 && latestProducts.map((item, index) => {
                return <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

            })
        }
        </div>

    </div>
  )
}

export default LastestCollections
