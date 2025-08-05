import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.config.js';
import connectToDataBase from './config/mongoDB.config.js';
import connectToCloud from './config/cloundinary.config.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/products.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter)


app.get('/', (req, res) => {
    res.send('API working...');
})


//if nodemon does clean-exit, there could be problem with env variables.
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    connectToDataBase();
    connectToCloud();
    
})