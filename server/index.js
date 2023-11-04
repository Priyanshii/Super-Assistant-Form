import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({limit: "10mb"}));
app.use(cors({
  origin: ['http://localhost:3000', 'https://blog-app-mern-drab.vercel.app'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/blog', blogRoutes);
app.use('/auth', userRoutes);

app.listen(port, ()=> console.log(`Server is listening on port: ${port}`))