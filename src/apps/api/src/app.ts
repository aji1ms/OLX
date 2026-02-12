import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDb } from './config/prisma';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './modules/auth/auth.routes';
import categoryRoutes from './modules/category/category.routes';
import productRoutes from './modules/product/product.routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,              
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

connectDb();

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

app.use(errorHandler);

export default app;