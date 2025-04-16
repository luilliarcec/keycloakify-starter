import { cn } from '@/lib/utils';
import * as React from "react";

interface ErrorProps {
    children: string | React.ReactNode | undefined;
    className?: string;
    asList?: boolean;
}

export default function InputError({ children, asList = false, className = '', ...props }: ErrorProps) {
    if (! children) {
        return null;
    }

    const baseClassName = "text-sm text-red-600 dark:text-red-400";

    if (asList) {
        return (
            <li {...props} className={cn(baseClassName, className)} dangerouslySetInnerHTML={{ __html: children }}>
            </li>
        );
    }

    return (
        <p {...props} className={cn(baseClassName, className)} dangerouslySetInnerHTML={{ __html: children }}>
        </p>
    );
}
