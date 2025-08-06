import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const data = [
    {link: "/add", image: assets.add_icon, text: "Add Items", alt: "Plus image with circular bg at sidebar"},
    {link: "/list", image: assets.order_icon, text: "List Items", alt: "Notebad icon at sidebar"}, 
    {link: "/orders", image: assets.order_icon, text: "Orders", alt: "Notebad icon at sidebar"}
]

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            {
            data.map((item, idx) => (
                <NavLink key={idx} to={item.link} className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                    <img src={item.image} alt={item.alt} />
                    <p className='hidden md:block'> {item.text} </p>
                </NavLink>
                ))
            }

        </div>
      
    </div>
  )
}

export default Sidebar
