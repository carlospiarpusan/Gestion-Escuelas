import React from 'react';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyle = {
        padding: '12px 24px',
        borderRadius: '980px', // Pill shape
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        outline: 'none',
    };

    const variants = {
        primary: {
            background: '#0071e3',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 113, 227, 0.3)',
        },
        secondary: {
            background: 'rgba(0, 113, 227, 0.1)',
            color: '#0071e3',
        },
        outline: {
            background: 'transparent',
            border: '1px solid #d2d2d7',
            color: '#1d1d1f',
        },
        ghost: {
            background: 'transparent',
            color: '#0071e3',
        },
        danger: {
            background: '#FF3B30',
            color: 'white',
            boxShadow: '0 4px 12px rgba(255, 59, 48, 0.3)',
        }
    };

    const style = { ...baseStyle, ...variants[variant] };

    return (
        <button
            style={style}
            onMouseEnter={(e) => {
                if (variant === 'primary' || variant === 'danger') {
                    e.target.style.transform = 'scale(1.02)';
                }
                if (variant === 'secondary') {
                    e.target.style.background = 'rgba(0, 113, 227, 0.15)';
                }
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                if (variant === 'secondary') {
                    e.target.style.background = 'rgba(0, 113, 227, 0.1)';
                }
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.02)'}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
