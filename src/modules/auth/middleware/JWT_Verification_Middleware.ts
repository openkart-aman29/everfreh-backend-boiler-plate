import { Request, Response, NextFunction } from 'express';

// TODO: Implement JWT verification middleware
export const accessTokenVerificationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // For now, just pass through
    next();
};