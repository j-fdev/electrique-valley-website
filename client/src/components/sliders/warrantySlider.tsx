import React, { useState, useEffect, useRef } from 'react';

interface WarrantySliderProps {
    images: readonly string[];
    /** One description per image (alt text), in the current language */
    alts: readonly string[];
    /** Accessible names for the slide buttons, e.g. "Photo 1 sur 3" */
    slideLabel: (index: number, total: number) => string;
}

const SLIDE_MS = 3500;

/**
 * Cross-fading photo carousel for the warranty band. The visible photo zooms in slowly (CSS),
 * the progress bars show the timing and let visitors pick a photo. Hover or keyboard focus
 * freezes the current photo and its bar where they are; leaving resumes from that point
 * (it does not restart). Autoplay is off with "reduce motion" (the bars still work).
 */
const WarrantySlider: React.FC<WarrantySliderProps> = ({ images, alts, slideLabel }) => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const autoplay = !reduceMotion && images.length > 1;
    // Time left for the current photo, and when the running timer started
    const remaining = useRef(SLIDE_MS);
    const startedAt = useRef(0);

    // A new photo gets its full time
    useEffect(() => { remaining.current = SLIDE_MS; }, [current]);

    useEffect(() => {
        if (!autoplay || paused) return;
        startedAt.current = Date.now();
        const timer = setTimeout(() => setCurrent((i) => (i + 1) % images.length), remaining.current);
        return () => {
            clearTimeout(timer);
            // Paused (or photo changed): keep what was left so the bar and timer resume together
            remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current));
        };
    }, [autoplay, paused, current, images.length]);

    return (
        <div
            className={`ev-wslider${autoplay ? ' is-playing' : ''}${paused ? ' is-paused' : ''}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            style={{ '--ev-slide-ms': `${SLIDE_MS}ms` } as React.CSSProperties}
        >
            {images.map((image, index) => (
                <img
                    key={image}
                    className={`ev-wslider__img${index === current ? ' is-active' : ''}`}
                    src={image}
                    alt={alts[index] ?? ''}
                    aria-hidden={index !== current}
                />
            ))}
            <div className="ev-wslider__bars">
                {images.map((image, index) => (
                    <button
                        key={image}
                        type="button"
                        className={`ev-wslider__bar${index === current ? ' is-active' : ''}${index < current ? ' is-done' : ''}`}
                        aria-label={slideLabel(index + 1, images.length)}
                        aria-current={index === current}
                        onClick={() => setCurrent(index)}
                    >
                        <span />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WarrantySlider;
