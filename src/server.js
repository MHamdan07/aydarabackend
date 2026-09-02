import app from './app.js';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { initCurrencyScheduler } from './services/currencyService.js';

const startServer = async () => {
  await connectDB();
  
  // Initialize Daily Exchange Rate Sync
  initCurrencyScheduler();

  app.listen(ENV.PORT, () => {
    console.log(`[AYDARA Luxury Server] Running on http://localhost:${ENV.PORT}`);
    console.log(`[AYDARA Luxury Server] REST Endpoints live at http://localhost:${ENV.PORT}/api/v1`);
  });
};

startServer();

