import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type AnchorProps = ComponentProps<'a'>;

export default function TextLink({ className = '', children, ...props }: AnchorProps) {
    return (
        <a
            className={cn(
                'text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current dark:decoration-neutral-500',
                className,
            )}
            {...props}
        >
            {children}
        </a>
    );
}
