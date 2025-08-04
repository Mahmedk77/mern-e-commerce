import { Routes, Route } from 'react-router'
import { About, Cart, Collection, Contact, 
         Home, Login, Orders, PlaceOrder, 
         Product } from './pages/index.js'
import { Footer, Navbar, Search } from './components'
 import { ToastContainer, toast } from 'react-toastify';
 
 function App() {
  

  return (
  <div className='px-4 sm:px-[5vm] md:px-[7vw] lg:px-[9vw]'> 
  <ToastContainer position='bottom-right' />
  <Navbar/>
  <Search />
  <Routes>
    <Route path={'/'} exact element={<Home />}/>
    <Route path={'/about'} element={<About />}/>
    <Route path={'/collection'} element={<Collection />}/>
    <Route path={'/contact'} element={<Contact />}/>
    <Route path={'/cart'} element={<Cart />}/>
    <Route path={'/placeOrders'} element={<PlaceOrder />}/>
    <Route path={'/product/:id'} element={<Product />}/>
    <Route path={'/login'} element={<Login />}/>
    <Route path={'/orders'} element={<Orders />}/>
  </Routes>
  <Footer />

  </div>

  )
}

export default App
