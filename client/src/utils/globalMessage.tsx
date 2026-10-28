

// Modules
import { useState, useEffect } from 'react';

export const GlobalMessage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 5000);
            return () => clearTimeout(timer); // Cleanup
        }
    }, [message]);

    return { message, setMessage };
};