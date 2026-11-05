import React, { useState, useEffect } from 'react';

interface WarrantySliderProps {
    images: readonly string[];
    /** One description per image (alt text), in the current language */
    alts: readonly string[];
    /** Accessible names for the slide buttons, e.g. "Photo 1 sur 3" */
    slideLabel: (index: number, total: number) => string;
}

const SLIDE_MS = 5000;

/**
 * Cross-fading photo carousel for the warranty band. The visible photo zooms in slowly (CSS),
 * the progress bars show the timing and let visitors pick a photo. Autoplay pauses on hover and
 * keyboard focus, and is off with "reduce motion" (the bars still work).
 */
const WarrantySlider: React.FC<WarrantySliderProps> = ({ images, alts, slideLabel }) => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const playing = !paused && !reduceMotion && images.length > 1;

    useEffect(() => {
        if (!playing) return;
        // Restarted on every change of "current", so a click gives the new photo its full time
        const timer = setTimeout(() => setCurrent((i) => (i + 1) % images.length), SLIDE_MS);
        return () => clearTimeout(timer);
    }, [playing, current, images.length]);

    return (
        <div
            className={`ev-wslider${playing ? ' is-playing' : ''}`}
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
                    loading={index === 0 ? undefined : 'lazy'}
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
