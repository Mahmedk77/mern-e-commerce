import express from 'express';
import cors from 'cors';
// import serverless from 'serverless-http';

const app = express();

app.use(cors({
  origin: [
    "https://mern-e-commerce-weld.vercel.app",
    "https://forever-admin-lilac-eta.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API working!' });
});

export default serverless(app); 