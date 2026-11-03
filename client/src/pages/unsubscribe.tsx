// Modules
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Config
import { API_BASE_URL } from '../config/api.config';

// Translations
import { legal } from '../translations/trans.legal';
import { LanguageContext } from '../translations/languageSelection';

type Status = { type: 'Success' | 'Error'; text: string } | null;

/**
 * Newsletter unsubscribe page (CASL).
 * - Opened from the link in our emails (?email=...&token=...): one button confirms and deletes the address.
 * - Opened directly: the visitor types the address and receives a confirmation link by email.
 * A button is required (no automatic unsubscribe on page load), because some mail apps open links
 * on their own to scan them.
 */
const Unsubscribe = () => {
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'fr';
    const U = legal.unsubscribe;

    const params = new URLSearchParams(useLocation().search);
    const linkToken = params.get('token') ?? '';
    const [tokenFailed, setTokenFailed] = useState(false);
    const token = tokenFailed ? '' : linkToken;   // after an invalid link, fall back to the email confirmation
    const linkLanguage = params.get('lang');

    const [email, setEmail] = useState(params.get('email') ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<Status>(null);

    // Show the page in the language of the email the link came from
    useEffect(() => {
        if (languageContext && (linkLanguage === 'fr' || linkLanguage === 'en') && linkLanguage !== languageContext.language) {
            languageContext.setLanguage(linkLanguage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [linkLanguage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || isLoading) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/email/unsubscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token: token || undefined, language: L }),
            });
            const result = await response.json();
            const text = result?.message?.[L] ?? (typeof result?.message === 'string' ? result.message : U.error[L]);
            setStatus({ type: result?.type === 'Success' ? 'Success' : 'Error', text });
            if (token && result?.type !== 'Success') setTokenFailed(true);
        } catch {
            setStatus({ type: 'Error', text: U.error[L] });
        } finally {
            setIsLoading(false);
        }
    };

    const isDone = status?.type === 'Success' && token;

    return (
        <>
            <section className="ev-page-hero">
                <div className="ev-container">
                    <h1>{U.title[L]}</h1>
                    <p>{token ? U.intro[L] : U.noLink[L]}</p>
                </div>
            </section>
            <section className="ev-section">
                <div className="ev-container">
                    <form className="ev-unsub" onSubmit={handleSubmit}>
                        {!isDone && (
                            <>
                                <label htmlFor="unsub-email">{U.emailLabel[L]}</label>
                                <input
                                    id="unsub-email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setStatus(null); }}
                                    readOnly={Boolean(token)}
                                    required
                                />
                                <button className="ev-btn" type="submit" disabled={isLoading}>
                                    {token ? U.confirm[L] : U.sendLink[L]}
                                </button>
                            </>
                        )}
                        {status && (
                            <p className={`ev-unsub__status ev-unsub__status--${status.type === 'Success' ? 'ok' : 'error'}`} role="status">
                                {status.text}
                            </p>
                        )}
                    </form>
                </div>
            </section>
        </>
    );
};

export default Unsubscribe;
