import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./database/connect.js";
import postRoutes from './routes/postRoutes.js';
import imgGenRoutes from './routes/imgGenRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb' }));

app.use('/api/post', postRoutes);
app.use('/api/imgGen', imgGenRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from AI Image Generator!');
})

const startServer = async () => {
    try {
        connectDB(process.env.DB_URL);
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`))
    }
    catch (err) {
        console.log(err)
    }

}

startServer()