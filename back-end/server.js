import express from 'express';
import cors from 'cors';
import connectToDataBase from './config/mongoDB.config.js';
import connectToCloud from './config/cloundinary.config.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/products.route.js';
import cartRouter from './routes/cart.route.js';
import ordersRouter from './routes/order.route.js';
import { PORT } from './config/env.config.js';


const app = express();

app.use(cors({
  origin: [
    "https://mern-e-commerce-weld.vercel.app",
    "https://forever-admin-lilac-eta.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', ordersRouter);


app.get('/', (req, res) => {
    res.send('API working...');
})


const port = PORT || 5000

app.listen(port, "0.0.0.0", async () => {
    console.log(`running on http://localhost:${port}`);
    await connectToDataBase();
    await connectToCloud();


})



export default app;