import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        service: 'circuit-breaker',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Welcome to circuit-breaker' });
});

const server = app.listen(PORT, () => {
    console.log('--------------------------------------------------');
    console.log('circuit-breaker started');
    console.log('Port: ' + PORT);
    console.log('Status: ACTIVE');
    console.log('--------------------------------------------------');
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});
