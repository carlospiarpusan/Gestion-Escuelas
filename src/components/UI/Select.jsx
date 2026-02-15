import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ label, error, options = [], ...props }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && (
                <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    marginBottom: '6px',
                    color: '#1d1d1f'
                }}>
                    {label}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                <select
                    style={{
                        width: '100%',
                        padding: '12px 36px 12px 14px',
                        borderRadius: '10px',
                        border: error ? '1px solid #FF3B30' : '1px solid #d2d2d7',
                        fontSize: '15px',
                        outline: 'none',
                        appearance: 'none',
                        backgroundColor: '#FFFFFF',
                        color: '#1d1d1f',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#0071e3';
                        e.target.style.boxShadow = '0 0 0 4px rgba(0,113,227,0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = error ? '#FF3B30' : '#d2d2d7';
                        e.target.style.boxShadow = 'none';
                    }}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#86868b',
                        pointerEvents: 'none'
                    }}
                />
            </div>
            {error && (
                <span style={{ fontSize: '12px', color: '#FF3B30', marginTop: '4px', display: 'block' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Select;
