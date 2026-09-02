import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/api.js';

const app = express();

// Security & Utility Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Static files (for local uploads if needed)
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', brand: 'AYDARA Luxury Fashion API', timestamp: new Date() });
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
