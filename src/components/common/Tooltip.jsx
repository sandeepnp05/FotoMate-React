import React, { useState, useRef, useEffect } from 'react';

function Tooltip({ text, children }) {
    const [isVisible, setVisible] = useState(false);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (isVisible && tooltipRef.current) {
            const rect = tooltipRef.current.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                tooltipRef.current.style.right = '0';
                tooltipRef.current.style.left = 'auto';
            } else if (rect.left < 0) {
                tooltipRef.current.style.left = '0';
                tooltipRef.current.style.transform = 'none';
            } else {
                tooltipRef.current.style.left = '50%';
                tooltipRef.current.style.transform = 'translateX(-50%)';
            }
        }
    }, [isVisible]);

    return (
        <div
            className='tooltip-container relative inline-block'
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`tooltip absolute z-10 p-1 rounded w-20 bg-black text-white text-xs bottom-4 left-1/2 transform -translate-x-1/2 mb-2 ${isVisible ? 'opacity-70' : 'opacity-0'} transition-opacity duration-200`}
                >
                    {text}
                </div>
            )}
        </div>
    );
}

export default Tooltip;
