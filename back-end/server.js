import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.config.js';
import connectToDataBase from './config/mongoDB.config.js';
import connectToCloud from './config/cloundinary.config.js';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API working...')
})

console.log(PORT)
//if nodemon does clean-exit, there could be problem with env variables.
app.listen(5000, () => {
    console.log(`server is running on http://localhost:5000`);
    connectToDataBase();
    connectToCloud();
    
})