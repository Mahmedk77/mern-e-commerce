import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getProductsData();
    }, [])

    const addToCart = async (itemId, size) => {

        let cartData = structuredClone(cartItems);
        if(!size){
            toast.error('Please select a size');
            return;
        } 
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
            
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        
        //if logged in:
        if(token){
        try {
            
            await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token }});
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }
    }
    

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){   //cartItems[items][item] just to reach this we used two loops
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    // const getCount = () => {
    //     return Object.values(cartData).reduce((sum, sizes) => {
    //         return Object.values(sizes).reduce((sum, qty) => {
    //             return sum += qty
    //         }, 0)
    //     }, 0)
    // }


    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity}, { headers: { token } })

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }


    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((products) => products._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]; 
                    }
                    
                } catch (error) {
                    
                }
            }
        } 
        return totalAmount;

    } 



    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl+ '/api/product/list')
            console.log(response.data);
            if(response.data.products){
                setProducts(response.data.products);
            } else{
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    const getUserCart = async ( token ) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if(response.data.success){
                setCartItems(response.data.cartData);
            } 
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }


    useEffect(()=>{
        getCartCount();
        console.log(getCartCount());
    }, [cartItems])

    useEffect(() => {
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
    }, [])
    
    const value = {
        products, currency, delivery_fee, showSearch, setShowSearch,
        search, setSearch, cartItems, setCartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount, navigate, backendUrl, token, setToken
    }

    

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;



