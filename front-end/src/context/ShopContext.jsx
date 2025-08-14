import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl);
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
        if(cartData[itemId]){ //is there any item with this id in the cart?  
            //if yes...
            if(cartData[itemId][size]){ //check if there is any size for this item id, if yes then add that size
                cartData[itemId][size] += 1;
            }
            else{ //if no create a new size(key:value pair) and set its size to 1
                cartData[itemId][size] = 1;
            }
            //if no...
        }else{
            cartData[itemId] = {}; //create an object for item id ==> cartData: { itemId: {} }
            cartData[itemId][size] = 1; //create a size key-value pair ==> cartData: { itemId: { "M": 1 } }
        }
        setCartItems(cartData); // {1234: { size: "M": 1, "L": 2 } }
        
        //if logged in:
        if(token){
        try {
            //then send the above data to the api
            await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token }}); 
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }
    }
    

    const getCartCount = () => {
        let totalCount = 0;
        // cartItems = {
        // 1234: { "M": 1, "L": 2 }, 
        // 5678: { "M": 2, "L": 2 },
        // 9101: { "S": 1, "L": 3 }, 
        // }
        for(const items in cartItems){ //1234: { "M": 1, "L": 2 } is items
            for(const item in cartItems[items]){ //{ "M": 1, "L": 2 } is item
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
            // console.log(response.data);
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
        // console.log(getCartCount());
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



