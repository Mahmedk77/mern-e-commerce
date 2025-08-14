import { useContext } from "react"
import { Link } from "react-router"
import { ShopContext } from "../context/ShopContext"



const ProductsItem = ({id, image, name, price, scrollToTop}) => {

    const {currency} = useContext(ShopContext)

    return (
    <Link onClick={scrollToTop}  to={`/product/${id}`} className="text-gray-700 cursor-pointer" >
        <div className="overflow-hidden">
            <img src={image[0]} alt="product images on home page" className="hover:scale-110 transition ease-in-out" />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="test-sm font-medium">{currency}{price}</p>
      
    </Link>
  )
}

export default ProductsItem
