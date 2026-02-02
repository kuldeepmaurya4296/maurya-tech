import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Save } from 'lucide-react';

export const AdminHeader = ({ title, description, onSave, onPreview, children }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="font-heading font-bold text-3xl">{title}</h1>
                {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            <div className="flex gap-3">
                {children}
                {onPreview && (
                    <Button variant="outline" onClick={onPreview}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                    </Button>
                )}
                {onSave && (
                    <Button onClick={onSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                )}
            </div>
        </div>
    );
};
