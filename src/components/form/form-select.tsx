import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import { FormInputProps } from "@/utils/types.ts";
import { getFormInputLabel, getFormOptions } from "@/utils/utils.ts";

export default function FormSelect(props: FormInputProps) {
    const { attribute, dispatchFormAction, displayableErrors, i18n, valueOrValues } =
        props;

    const options = getFormOptions(attribute);

    return (
        <Select
            name={attribute.name}
            disabled={attribute.readOnly}
            aria-invalid={displayableErrors.length !== 0}
            onValueChange={value =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        return value;
                    })()
                })
            }
        >
            <SelectTrigger name={attribute.name} className="w-full" tabIndex={1}>
                <SelectValue id={attribute.name} placeholder={valueOrValues} />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option} value={option}>
                        {getFormInputLabel(i18n, attribute, option)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
