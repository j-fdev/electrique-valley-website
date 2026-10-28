import { NextFunction, Request, Response } from "express";


export const validateLanguage = (req: Request, res: Response, next: NextFunction): void => {
    const { language = 'en' } = req.body;
    
    if (language && !['en', 'fr'].includes(language)) {
        res.status(400).json({
            type: 'Error',
            message: {
                en: 'Invalid language selection',
                fr: 'Sélection de langue invalide'
            },
            data: []
        });
        return;
    }
    next();
};