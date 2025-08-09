import { Router } from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller';

const cartRouter = Router();

cartRouter.post('/add', addToCart);
cartRouter.post('/get', getUserCart);
cartRouter.post('/update', updateCart);



export default cartRouter;