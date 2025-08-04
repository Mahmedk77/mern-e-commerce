import { createContext, use, useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();


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


    const updateQuantity = async (itemId, size, qty) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = qty;

        setCartItems(cartData);


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

    useEffect(()=>{
        getCartCount();
        console.log(getCartCount());
    }, [cartItems])

    const currency = "$";
    const delivery_fee = 10;
    const value = {
        products, currency, delivery_fee, showSearch, setShowSearch,
        search, setSearch, cartItems, setCartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount, navigate,
    }

    

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;



