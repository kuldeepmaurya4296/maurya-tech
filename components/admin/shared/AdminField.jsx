import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const AdminField = ({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    rows = 3,
    className,
    render,
    id
}) => {
    const inputId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={className}>
            {label && <Label htmlFor={inputId} className="mb-2 block">{label}</Label>}
            {render ? (
                render({ id: inputId, value, onChange, placeholder })
            ) : type === 'textarea' ? (
                <Textarea
                    id={inputId}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                />
            ) : (
                <Input
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};
