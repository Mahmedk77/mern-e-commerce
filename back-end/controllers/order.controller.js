import Stripe from 'stripe';
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { STRIPE_KEY } from '../config/env.config.js';



//global variables
const currency = 'usd', deliveryCharges = 10;

// gateway initialize
const stripe = new Stripe(STRIPE_KEY);

// Placing orders using COD method
const placeOrder = async (req, res) => {
    try {
        //userId is from middleware using token...
        const { userId, items, amount, address } = req.body;
        
        const orderData = {
            userId, 
            items, 
            amount, 
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData); //create a copy having orderData to save it
        await newOrder.save();
        await User.findByIdAndUpdate(userId, {cartData: {}}); //to renew cart once orders are placed.

        res.json({ success: true, message: "Order Placed"});


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message});
        
    }

}

// Placing orders using Stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers; //base url

        const orderData = {
            userId, 
            items, 
            amount, 
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const newOrder = new Order(orderData); //create a copy having orderData to save it
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({ success: true, session_url: session.url});


    
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message});
    }

}

// Placing orders using Razorpay
const placeOrderRazorpay = async (req, res) => {

}

// All orders for Admin Panel
const allOrders = async (req, res) => {
    try {

        const orders = await Order.find({});
        res.json({ success: true, orders});
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message});
    }

}

// Order Data for specific user (frontend)
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({ userId });
        res.json({ success: true, orders})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message});
    }

}

// Update order status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        await Order.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated'})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message});
    }

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};