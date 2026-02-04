import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Ensure JWT_SECRET is configured
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('FATAL: JWT_SECRET environment variable is not set.');
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            email?: string;
        }
    }
}

export interface AuthRequest extends Request {
    userId?: string;
    email?: string;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'No token provided',
            });
        }

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        ) as { userId: string; email: string };

        req.userId = decoded.userId;
        req.email = decoded.email;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                error: 'Token expired',
                message: 'Please login again',
            });
        }

        res.status(401).json({
            error: 'Invalid token',
            message: 'Authentication failed',
        });
    }
};
