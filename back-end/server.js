import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import connectToDataBase from './config/mongoDB.config.js';
import connectToCloud from './config/cloundinary.config.js';

import userRouter from './routes/user.route.js';
import productRouter from './routes/products.route.js';
import cartRouter from './routes/cart.route.js';
import ordersRouter from './routes/order.route.js';

const app = express();

// CORS
app.use(cors({
  origin: [
    "https://mern-e-commerce-weld.vercel.app",
    "https://forever-admin-lilac-eta.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', ordersRouter);

// Root route
app.get('/', (req, res) => {
  res.send('API working...');
});

// ⚠️ Connect DB & Cloud INSIDE handler
let isConnected = false;

app.use(async (req, res, next) => {
  if(!isConnected) {
    await connectToDataBase();
    await connectToCloud();

    isConnected = true;
  }
})


// const handler = async (req, res) => {
//   if (!isConnected) {
//     await connectToDataBase();
//     await connectToCloud();
//     isConnected = true;
//   }
//   return serverless(app)(req, res);
// };

module.exports = app;
// export default app;