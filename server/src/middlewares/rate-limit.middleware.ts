import { NextFunction, Request, RequestHandler, Response } from 'express';

interface RateLimitOptions {
    windowMs: number;
    max: number;
    message: { en: string; fr: string };
}

/**
 * Limits how many requests one visitor (IP address) can send in a time window.
 * Kept in memory: fine for a single server, and the counts reset when the server restarts.
 */
export const rateLimit = ({ windowMs, max, message }: RateLimitOptions): RequestHandler => {
    const visitors = new Map<string, { count: number; resetAt: number }>();

    return (req: Request, res: Response, next: NextFunction): void => {
        const now = Date.now();
        const key = req.ip ?? 'unknown';

        let visitor = visitors.get(key);
        if (!visitor || visitor.resetAt <= now) {
            visitor = { count: 0, resetAt: now + windowMs };
            visitors.set(key, visitor);
        }
        visitor.count += 1;

        // Forget expired visitors so the map doesn't grow forever.
        if (visitors.size > 10000) {
            for (const [ip, entry] of visitors) if (entry.resetAt <= now) visitors.delete(ip);
        }

        if (visitor.count > max) {
            res.set('Retry-After', String(Math.ceil((visitor.resetAt - now) / 1000)));
            res.status(429).json({ type: 'Error', message, data: [] });
            return;
        }
        next();
    };
};

/**
 * Spam trap: the forms contain a hidden "website" field that people never see, but bots fill in.
 * Bots get a normal-looking success response and no email is sent.
 */
export const honeypot: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    if (typeof req.body?.website === 'string' && req.body.website.trim() !== '') {
        res.status(201).json({ type: 'Success', message: { en: 'Thank you!', fr: 'Merci!' }, data: [] });
        return;
    }
    next();
};
