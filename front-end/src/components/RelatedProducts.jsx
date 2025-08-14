import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";
import ProductsItem from "./ProductsItem";


const RelatedProducts = ({category, subCategory}) => {
  const {products} = useContext(ShopContext);
  const [related, setRelated] = useState([]);
    
  useEffect(() => {

    if(products.length > 0){
        let pc = products.slice();
        pc = pc.filter((item) => category === item.category);
        pc = pc.filter((item) => subCategory === item.subCategory);

        setRelated(pc.slice(0,5));
    }
  }, [products])

return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"}/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6" >
          {related.map((item, idx) => {
            return (
              <div onClick={() => window.scrollTo({top: 0, behavior: "smooth"})} key={idx}>
              <ProductsItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
              </div>
              
            );
          })}
        </div>
    </div>
  )
}

export default RelatedProducts
