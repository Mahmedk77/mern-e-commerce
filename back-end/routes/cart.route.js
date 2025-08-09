import { Router } from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller.js';
import authUser from '../middlewares/auth.middleware.js';

const cartRouter = Router();

cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/get', authUser, getUserCart);
cartRouter.post('/update', authUser, updateCart);



export default cartRouter;