

import express from 'express';
import { sendEmail, subscribeEmail } from "../controllers/email.controller";
import { validateContact, validateSubscribe } from "../middlewares/validation.middleware";
import { validateLanguage } from '../middlewares/language.validation.middleware';
import { honeypot, rateLimit } from '../middlewares/rate-limit.middleware';

const MINUTE = 60 * 1000;

const contactLimiter = rateLimit({
    windowMs: 15 * MINUTE,
    max: 5,
    message: {
        en: 'Too many messages sent. Please try again in a few minutes.',
        fr: 'Trop de messages envoyés. Veuillez réessayer dans quelques minutes.',
    },
});

const subscribeLimiter = rateLimit({
    windowMs: 60 * MINUTE,
    max: 5,
    message: {
        en: 'Too many attempts. Please try again later.',
        fr: 'Trop de tentatives. Veuillez réessayer plus tard.',
    },
});

const emailRouter = express.Router();

emailRouter.post('/send-email', contactLimiter, honeypot, validateLanguage, validateContact, sendEmail);
emailRouter.post('/subscribe', subscribeLimiter, honeypot, validateLanguage, validateSubscribe, subscribeEmail);

export default emailRouter;
