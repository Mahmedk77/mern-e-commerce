import { Router } from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus} from '../controllers/order.controller.js'
import { adminAuth } from '../middlewares/admin.middleware.js';
import authUser from '../middlewares/auth.middleware.js';

const ordersRouter = Router();

// Admin Features
ordersRouter.post('/orders', adminAuth, allOrders)
ordersRouter.post('/status', adminAuth, updateStatus)

// Payment Features
ordersRouter.post('/place', authUser, placeOrder)
ordersRouter.post('/stripe', authUser, placeOrderStripe)
ordersRouter.post('/razorpay', authUser, placeOrderRazorpay)

// User Feature
ordersRouter.post('/userorders', authUser, userOrders)


export default ordersRouter;
