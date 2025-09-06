import express from 'express';
import cors from 'cors';
import connectToDataBase from './config/mongoDB.config.js';
import connectToCloud from './config/cloundinary.config.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/products.route.js';
import cartRouter from './routes/cart.route.js';
import ordersRouter from './routes/order.route.js';

const app = express();

// ✅ CORS setup at the very top
app.use(cors({
  origin: [
    "https://mern-e-commerce-weld.vercel.app",   // frontend
    "https://forever-admin-lilac-eta.vercel.app", // admin
    "http://localhost:5173"                      // local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', ordersRouter);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('API working...');
});

// ✅ DB + Cloudinary connection once
(async () => {
  await connectToDataBase();
  await connectToCloud();
})();

export default app;
