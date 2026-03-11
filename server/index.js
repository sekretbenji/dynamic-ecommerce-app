import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import videoRoutes from './routes/video.js';
import liveRoutes from './routes/live.js';

// Load environment variables from .env if present
dotenv.config();

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/live', liveRoutes);

// Health check route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the dynamic e commerce API' });
});

// Start server and connect database
const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    await sequelize.sync({ alter: false });
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
