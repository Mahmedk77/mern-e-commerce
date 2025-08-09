import { Router } from 'express';
import { addProduct, removeProduct, singleProduct, listProducts } from '../controllers/products.controller.js';
import upload from '../middlewares/multer.middleware.js';
import { adminAuth } from '../middlewares/admin.middleware.js'

const productRouter = Router();

const multerData = [
    { name: 'image1', maxCount: 1}, 
    { name: 'image2', maxCount: 1}, 
    { name: 'image3', maxCount: 1}, 
    { name: 'image4', maxCount: 1}, 
]

productRouter.post('/add', adminAuth, upload.fields(multerData), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.get('/single', adminAuth, singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;