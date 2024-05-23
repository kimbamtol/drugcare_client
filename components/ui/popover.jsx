import React from 'react';

export function Popover({ children }) {
    return (
        <div className="relative">
            <div className="popover-content">
                {children}
            </div>
        </div>
    );
}

export function PopoverTrigger({ children }) {
    return (
        <button className="popover-trigger">
            {children}
        </button>
    );
}

export function PopoverContent({ children }) {
    return (
        <div className="popover-content">
            {children}
        </div>
    );
}
