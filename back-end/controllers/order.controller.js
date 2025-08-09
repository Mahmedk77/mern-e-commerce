
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

// Placing orders using COD method
const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;
        
        const orderData = {
            userId, 
            items, 
            amount, 
            address,
            paymentMethod: "COD",
            payment: false,
            date: new Date.now()
        }

        const newOrder = new Order(orderData);
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

}

// Placing orders using Razorpay
const placeOrderRazorpay = async (req, res) => {

}

// All orders for Admin Panel
const allOrders = async (req, res) => {

}

// Order Data for specific user (frontend)
const userOrders = async (req, res) => {

}

// Update order status from Admin panel
const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};