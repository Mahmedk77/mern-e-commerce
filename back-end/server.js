import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.config.js';
import connectToDataBase from './config/mongoDB.config.js';
import connectToCloud from './config/cloundinary.config.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/products.route.js';
import cartRouter from './routes/cart.route.js';
import ordersRouter from './routes/order.route.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', ordersRouter);



app.get('/', (req, res) => {
    res.send('API working...');
})

await connectToDataBase();
await connectToCloud();

if(process.env.NODE_ENV !== "production"){
    const PORT = PORT || 5000;
    app.listen(PORT, () => {
    console.log(`Running locally on http://localhost:${PORT}`)
})
}
export default app;