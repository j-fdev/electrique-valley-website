import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

import { Newsletter } from '../entities/subscriber.model';
import { AppDataSource } from '../database/sql';
import { translate, emailTranslations } from '../translation/validation.trans'
import { normalizeEmail, isValidUnsubscribeToken, unsubscribeUrl, senderFooter } from '../utilities/unsubscribe';

const sendEmail = async (req: Request, res: Response) => {
    try {
        const { language = 'en' }: { language?: t_email_sending }  = req.body;
        const { first_name, last_name, phone_number, business_name, town, province, email, emailSubject, message } = req.body;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let emailBody = `First Name: ${first_name}
Last Name: ${last_name}
Email: ${email}
Phone Number: ${phone_number}`;

        if (emailSubject === 'Become a Dealer Inquiry' || emailSubject === 'Find a Dealer Inquiry') {
            emailBody += `
Business Name: ${business_name}
Town: ${town}
Province: ${province}`;
        }

        emailBody += `
Message: 
${message}`;

        let adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `Contact Form Submission: ${emailSubject}`,
            text: emailBody.trim() 
        };
        let userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailTranslations.contact.subject[language],
            text: emailTranslations.contact.body[language],
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);
        res.status(201).json({ type: 'Success',
            message: {
                en: translate.email_sent_successfully.en,
                fr: translate.email_sent_successfully.fr
            },
            data: [] 
        });
    } catch (error) {
        console.log('Error sending email:', error);
        res.status(500).json({ type: 'Error',
            message: {
                en: translate.email_error.en,
                fr: translate.email_error.fr
            },
            data: [] 
        });
    }
};
type t_email_sending = 'en' | 'fr';
interface i_email_sending {
    email: string;
    error? : string;
}

const subscribeEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, language = 'en' }: { email: string, language?: t_email_sending } = req.body;
        
        if (!email || typeof email !== 'string' || !email.trim()) {
            res.status(400).json({ 
                type: 'Error',
                message: {
                    en: translate.emailRequired.en,
                    fr: translate.emailRequired.fr
                }, 
                data: [] 
            });
            return;
        }

        const cleanEmail = normalizeEmail(email);
        const newsletterRepository = AppDataSource.getRepository(Newsletter);
        const existingEmail = await newsletterRepository.findOne({ 
            where: { email: cleanEmail } 
        });
        
        if (existingEmail) {
            res.status(400).json({ type: 'Error',
                 message: {
                    en: translate.emailAlreadySubscribed.en,
                    fr: translate.emailAlreadySubscribed.fr
                },
                data: [] 
            });    
            return; 
        }

        const newsletter = newsletterRepository.create({ email: cleanEmail });
        await newsletterRepository.save(newsletter);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        let adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: emailTranslations.newsletter.subject[language],
            text: `Email: ${email}`
        };
        let userMailOptions = {
            from: process.env.EMAIL_USER,
            to: cleanEmail,
            subject: emailTranslations.newsletter.subject[language],
            // CASL: sender identification and an unsubscribe link in every newsletter email
            text: emailTranslations.newsletter.body[language] + senderFooter(cleanEmail, language)
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);
        res.status(201).json({ type: 'Success',
             message: {
                en: translate.subscriptionSuccessful.en,
                fr: translate.subscriptionSuccessful.fr
            }, 
            data: [] 
        });
    } catch (error) {
        console.log('Subscription error:', error);
               // TypeGuard for MySQL duplicate entry error
               if (
                typeof error === 'object' && 
                error !== null && 
                'code' in error && 
                error.code === 'ER_DUP_ENTRY'
            ) {
                res.status(409).json({
                    type: 'Error',
                    message: {
                        en: translate.emailAlreadySubscribed.en,
                        fr: translate.emailAlreadySubscribed.fr
                    },
                    data: []
                });
                return;
            }
    
            // Log the actual error for debugging
            console.error('Detailed error:', error);

        res.status(500).json({
            type: 'Error',
            message: {
                en: translate.subscriptionError.en,
                fr: translate.subscriptionError.fr
            },
            data: []
        });
    }
};

/**
 * Unsubscribe from the newsletter.
 * - With a valid token (link in our emails): the address is deleted right away.
 * - Without a token (address typed on the /unsubscribe page): if it is subscribed, we email it
 *   a confirmation link. The answer is the same either way, so nobody can find out who is subscribed.
 */
const unsubscribeEmail = async (req: Request, res: Response) => {
    const { language = 'en', email, token }: { language?: t_email_sending; email?: string; token?: string } = req.body;
    try {
        if (!email || typeof email !== 'string' || !email.trim()) {
            res.status(400).json({ type: 'Error', message: translate.emailRequired, data: [] });
            return;
        }
        const cleanEmail = normalizeEmail(email);
        const newsletterRepository = AppDataSource.getRepository(Newsletter);

        if (token) {
            if (!isValidUnsubscribeToken(cleanEmail, token)) {
                res.status(400).json({ type: 'Error', message: translate.unsubscribeInvalidLink, data: [] });
                return;
            }
            // Law 25: the privacy policy says the address is deleted after unsubscribing
            await newsletterRepository.delete({ email: cleanEmail });
            res.status(200).json({ type: 'Success', message: translate.unsubscribeDone, data: [] });
            return;
        }

        const subscriber = await newsletterRepository.findOne({ where: { email: cleanEmail } });
        if (subscriber) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
            });
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: cleanEmail,
                subject: emailTranslations.unsubscribe.subject[language],
                text: emailTranslations.unsubscribe.body[language] + unsubscribeUrl(cleanEmail, language)
            });
        }
        res.status(200).json({ type: 'Success', message: translate.unsubscribeCheckEmail, data: [] });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({ type: 'Error', message: translate.subscriptionError, data: [] });
    }
};

export { sendEmail, subscribeEmail, unsubscribeEmail };
