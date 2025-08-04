import { useState } from "react"
import SidebarItem from "./SidebarItem"


const Sidebar = () => {
    const [visible, setVisible] = useState(false)
  return (
    <div className="flex flex-col gap-4 w-full  md:w-1/5 mt-4 "> 
        <h1 className="text-xl text-gray-800 mb-2">FILTERS <span className="text-gray-300 ml-2 cursor-pointer visible sm:hidden" onClick={()=>setVisible(!visible)}> {">"} </span></h1>
        <div className={` transition ease-in-out duration-200 ${visible ? 'h-full' : 'h-0'} sm:h-auto overflow-hidden`}> 
        <SidebarItem title={"CATEGORIES"} item1={"Men"} item2={"Women"} item3={"Kids"}/>
        <SidebarItem title={"TYPE"} item1={"Topwear"} item2={"Bottomwear"} item3={"Winterwear"}/>
        </div>
        
    </div>
  )
}

export default Sidebar
