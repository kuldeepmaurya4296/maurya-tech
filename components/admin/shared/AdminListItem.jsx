import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export const AdminListItem = ({ children, onRemove, className }) => {
    return (
        <div className={`p-4 border rounded-lg relative ${className}`}>
            {onRemove && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    className="absolute top-2 right-2 text-destructive hover:text-destructive/90 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            )}
            {children}
        </div>
    );
};
