import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/api.js';
import { ENV } from './config/env.js';

const app = express();

// Secure CORS configuration supporting production domains, Vercel previews & localhost
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  ENV.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('aydara')
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Static files (for local uploads if needed)
app.use('/uploads', express.static('uploads'));

// Health check endpoints
app.get(['/health', '/api/health', '/api/v1/health'], (req, res) => {
  res.json({
    status: 'ok',
    brand: 'AYDARA Luxury Fashion API',
    timestamp: new Date().toISOString()
  });
});

// API v1 Routes
app.use('/api/v1', apiRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[AYDARA Server Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected luxury service error occurred.'
  });
});

export default app;
