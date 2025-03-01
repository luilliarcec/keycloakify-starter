import { cn } from '@/lib/utils';
import * as React from "react";

const variants = {
    info: 'text-blue-600 dark:text-blue-600',
    success: 'text-green-600 dark:text-green-600',
    error: 'text-red-600 dark:text-red-600',
    warning: 'text-orange-600 dark:text-orange-600',
    undefined: 'text-gray-900 dark:text-gray-900',
};

interface TextInfoProps {
    children?: React.ReactNode;
    variant?: 'info' | 'success' | 'error' | 'warning' | undefined;
}

export default function TextInfo({ children, variant = 'info', ...props }: TextInfoProps) {
    return (
        <>
            <div {...props} className={cn('mb-6 flex justify-center', variants[variant])}>
                {children}
            </div>
        </>
    );
}
