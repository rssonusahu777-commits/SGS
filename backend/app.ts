import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import aiRoutes from './routes/aiRoutes';
import authRoutes from './routes/authRoutes';
import tournamentRoutes from './routes/tournamentRoutes';
import { errorHandler } from './middleware/error';

const backendApp = express();

// Middleware
backendApp.use(express.json());
backendApp.use(express.urlencoded({ extended: true }));
backendApp.use(cookieParser());
backendApp.use(cors());
backendApp.use(helmet({ contentSecurityPolicy: false })); // Disabled for dev/preview
backendApp.use(compression());
backendApp.use(morgan('dev'));

// Routes
backendApp.use('/api/auth', authRoutes);
backendApp.use('/api/ai', aiRoutes);
backendApp.use('/api/tournaments', tournamentRoutes);

// Health check
backendApp.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

// Error handling middleware
backendApp.use(errorHandler);

export default backendApp;
