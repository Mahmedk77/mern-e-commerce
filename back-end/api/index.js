import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import connectToDataBase from '../config/mongoDB.config.js';
import connectToCloud from '../config/cloundinary.config.js';

import userRouter from '../routes/user.route.js';
import productRouter from '../routes/products.route.js';
import cartRouter from '../routes/cart.route.js';
import ordersRouter from '../routes/order.route.js';


const app = express();

app.use(cors({
  origin: [
    "https://mern-e-commerce-weld.vercel.app",   // ← your actual frontend URL
    "https://forever-admin-lilac-eta.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', ordersRouter);

app.get('/', (req, res) => {
  res.send('API working...');
});

// Connect once, outside the handler
// let isConnected = false;
// const initConnections = async () => {
//   if (!isConnected) {
//       await connectToCloud();
//       await connectToDataBase();
//     isConnected = true;
//   }
// };

// // Wrap once, not on every request
// const serverlessHandler = serverless(app);

// export default async (req, res) => {
//   await initConnections();
//   return serverlessHandler(req, res);
// };

// Connect immediately when the module loads, not per-request
connectToDataBase();
connectToCloud();

const serverlessHandler = serverless(app);

export default async (req, res) => {
  return serverlessHandler(req, res);
};