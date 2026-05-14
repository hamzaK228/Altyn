import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import { errorHandler } from './lib/errors.js';
import { logger } from './lib/logger.js';

// Route Imports
import authRoutes from './modules/auth/auth.routes.js';
import goldRoutes from './modules/gold/gold.routes.js';
import portfolioRoutes from './modules/portfolio/portfolio.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const requestId = crypto.randomUUID();
  (req as any).requestId = requestId;

  logger.info(`→ ${req.method} ${req.url}`, {
    requestId,
    method: req.method,
    path: req.path,
  });

  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`← ${req.method} ${req.url} ${res.statusCode}`, {
      requestId,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
});

// Root — API Documentation
app.get('/', (_req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Altyn API Server</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0a0a0f; color: #e0e0e0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .container { max-width: 700px; width: 100%; padding: 48px; }
    h1 { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #d4a028, #f0c850); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; }
    .subtitle { color: #888; margin-bottom: 40px; font-size: 1.05rem; }
    .status { display: inline-flex; align-items: center; gap: 8px; background: #0f2e0f; color: #4ade80; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 32px; }
    .status .dot { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .section { margin-bottom: 28px; }
    .section h3 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 12px; }
    .endpoint { display: flex; align-items: center; gap: 12px; padding: 10px 16px; background: #111118; border: 1px solid #1a1a25; border-radius: 10px; margin-bottom: 6px; font-size: 0.9rem; transition: border-color 0.2s; cursor: pointer; text-decoration: none; }
    .endpoint:hover { border-color: #d4a028; }
    .method { font-weight: 700; font-size: 0.75rem; padding: 3px 8px; border-radius: 4px; min-width: 50px; text-align: center; }
    .get { background: #0a2540; color: #60a5fa; }
    .post { background: #1a2e0a; color: #4ade80; }
    .path { color: #ccc; font-family: 'Consolas', monospace; }
    .lock { color: #d4a028; font-size: 0.7rem; margin-left: auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Altyn API</h1>
    <p class="subtitle">Gold Investment Platform — REST API v1.0</p>
    <div class="status"><span class="dot"></span> Server Online</div>

    <div class="section">
      <h3>Auth</h3>
      <div class="endpoint"><span class="method post">POST</span><span class="path">/api/auth/register</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="path">/api/auth/login</span></div>
      <a href="/api/auth/me" class="endpoint"><span class="method get">GET</span><span class="path">/api/auth/me</span><span class="lock">JWT</span></a>
    </div>

    <div class="section">
      <h3>Gold Market</h3>
      <a href="/api/gold/price" class="endpoint"><span class="method get">GET</span><span class="path">/api/gold/price</span></a>
      <a href="/api/gold/history" class="endpoint"><span class="method get">GET</span><span class="path">/api/gold/history</span></a>
      <a href="/api/gold/stats" class="endpoint"><span class="method get">GET</span><span class="path">/api/gold/stats</span></a>
    </div>

    <div class="section">
      <h3>Portfolio</h3>
      <div class="endpoint"><span class="method get">GET</span><span class="path">/api/portfolio</span><span class="lock">JWT</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="path">/api/portfolio/buy</span><span class="lock">JWT</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="path">/api/portfolio/sell</span><span class="lock">JWT</span></div>
      <div class="endpoint"><span class="method get">GET</span><span class="path">/api/portfolio/transactions</span><span class="lock">JWT</span></div>
    </div>

    <div class="section">
      <h3>System</h3>
      <a href="/health" class="endpoint"><span class="method get">GET</span><span class="path">/health</span></a>
    </div>
  </div>
</body>
</html>
  `);
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), store: 'in-memory' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gold', goldRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const start = async () => {
    // Try MongoDB, fallback to in-memory
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Altyn API server running on http://localhost:${PORT}`, { port: PORT });
    });
  };

  start().catch((error) => {
    logger.error('Failed to start server', error as Error);
    process.exit(1);
  });
}

export default app;
