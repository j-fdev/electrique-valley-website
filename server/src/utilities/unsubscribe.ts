import crypto from 'crypto';

/**
 * Unsubscribe links (Canada's anti-spam law, CASL: every newsletter email needs one).
 * The token is an HMAC of the email address: only the server, which knows UNSUBSCRIBE_SECRET,
 * can create it, so nobody can unsubscribe someone else's address by guessing a link.
 */
const secret = (): string => {
    const value = process.env.UNSUBSCRIBE_SECRET;
    if (!value || value.length < 32) {
        throw new Error('UNSUBSCRIBE_SECRET is missing or too short in .env (use at least 32 random characters)');
    }
    return value;
};

export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const unsubscribeToken = (email: string): string =>
    crypto.createHmac('sha256', secret()).update(normalizeEmail(email)).digest('hex');

/** Constant-time comparison, so the response time gives no hint about the right token */
export const isValidUnsubscribeToken = (email: string, token: string): boolean => {
    if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) return false;
    const expected = Buffer.from(unsubscribeToken(email), 'hex');
    const received = Buffer.from(token, 'hex');
    return expected.length === received.length && crypto.timingSafeEqual(expected, received);
};

/** Link to the website's /unsubscribe page (first address of FRONTEND_URL) */
export const unsubscribeUrl = (email: string, language: 'en' | 'fr'): string => {
    const site = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',')[0].trim().replace(/\/$/, '');
    const params = new URLSearchParams({ email: normalizeEmail(email), token: unsubscribeToken(email), lang: language });
    return `${site}/unsubscribe?${params.toString()}`;
};

/** Sender identification required by CASL at the bottom of every commercial email */
export const senderFooter = (email: string, language: 'en' | 'fr'): string => {
    const link = unsubscribeUrl(email, language);
    return language === 'fr'
        ? `\n\n--\nElectrique Valley, Salaberry-de-Valleyfield (Québec)\n450 747-1525 · info@electriquevalley.com\nPour ne plus recevoir nos courriels : ${link}`
        : `\n\n--\nElectrique Valley, Salaberry-de-Valleyfield, Quebec\n450 747-1525 · info@electriquevalley.com\nTo stop receiving our emails: ${link}`;
};
