import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
// Database and Redis setup (moved to db.ts)

// Routes
import authRoutes from './routes/auth';
import rateRoutes from './routes/rates';
import lockRoutes from './routes/locks';
import transactionRoutes from './routes/transactions';
import healthRoutes from './routes/health';

// Middleware
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// DATABASE & REDIS SETUP
// ============================================================================

import { db, redisClient } from './db';

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Security
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined', {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute per IP
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// Request ID middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    req.headers['x-request-id'] = req.headers['x-request-id'] ||
        `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    next();
});

// ============================================================================
// ROUTES
// ============================================================================

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rates', rateRoutes);
app.use('/api/v1/locks', lockRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/health', healthRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({
        service: 'FX Rate Lock Platform API',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString(),
    });
});

// Error handler
app.use(errorHandler);

// ============================================================================
// SERVER STARTUP
// ============================================================================

async function startServer() {
    try {
        // Connect to Redis
        await redisClient.connect();
        logger.info('✅ Redis connected');

        // Test database connection
        await db.query('SELECT NOW()');
        logger.info('✅ Database connected');

        // Start server
        app.listen(PORT, () => {
            logger.info(`🚀 API Gateway running on port ${PORT}`);
            logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
            logger.info(`🔗 CORS enabled for: ${process.env.CORS_ORIGIN || 'localhost'}`);
        });
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully...');

    await redisClient.quit();
    await db.end();

    process.exit(0);
});

process.on('SIGINT', async () => {
    logger.info('SIGINT received, shutting down gracefully...');

    await redisClient.quit();
    await db.end();

    process.exit(0);
});

// Start the server
startServer();

export default app;
