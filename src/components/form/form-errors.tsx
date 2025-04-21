import Errors from "@/components/errors.tsx";
import { FormInputErrorsProps } from "@/utils/types.ts";
import { cn } from "@/lib/utils.ts";

export default function FormErrors(props: FormInputErrorsProps & { className?: string} ) {
    const { attribute, fieldIndex, className } = props;

    const displayableErrors = props.displayableErrors.filter(
        error => error.fieldIndex === fieldIndex
    );

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <ul
            id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
            aria-live="polite"
            className={cn(className)}
        >
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessageStr }, i) => (
                    <Errors key={i} asList>
                        {errorMessageStr}
                    </Errors>
                ))}
        </ul>
    );
}
