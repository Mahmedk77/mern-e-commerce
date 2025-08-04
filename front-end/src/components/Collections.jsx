import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import Title from "./Title"
import { ShopContext } from "../context/ShopContext"
import ProductsItem from "./ProductsItem"


const Collections = () => {
    const {products} = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    return (
    <div className="flex flex-col gap-2 flex-1" >
        <div className="flex justify-between p-2 text-md sm:text-2xl ">
            
            <Title text1={"ALL"} text2={"COLLECTIONS"}/>
            
            <div onClick={()=>setVisible(!visible)} className="relative flex justify-around items-center text-sm w-40 border-2 border-gray-300">
                <p className="inline-flex gap-0.5">Sort by: <span>Relevant</span></p>
                <img src={assets.dropdown_icon} alt="" className="rotate-90 h-2" />
                <div className={`absolute left-[-1.2px] top-[41px] bg-white border flex flex-col  w-40 ${visible ? 'block': 'hidden' } z-100`}>
                <p className="inline-flex gap-0.5 p-1 hover:bg-blue-500 hover:text-white cursor-pointer">Sort by: <span>Relevant</span></p>
                <p className="inline-flex gap-0.5 p-1 hover:bg-blue-500 hover:text-white cursor-pointer">Sort by: <span>High to Low</span></p>
                <p className="inline-flex gap-0.5 p-1 hover:bg-blue-500 hover:text-white cursor-pointer">Sort by: <span>Low to High</span></p>
                </div>
            </div>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"> 
        {
            products.map((item, idx)=>{
                return <ProductsItem key={idx} image={item.image} id={item._id} name={item.name} price={item.price}/>

            })
        }
      </div>
      
    </div>)
  

}
export default Collections
