import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        service: 'aave-manager',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Welcome to aave-manager' });
});

const server = app.listen(PORT, () => {
    console.log('--------------------------------------------------');
    console.log('aave-manager started');
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
