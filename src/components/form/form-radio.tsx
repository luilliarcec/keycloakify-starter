import { FormInputProps } from "@/utils/types.ts";
import { assert } from "keycloakify/tools/assert";
import { getFormInputLabel, getFormOptions } from "@/utils/utils.ts";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";

export default function FormRadio(props: FormInputProps) {
    const { attribute, dispatchFormAction, i18n, valueOrValues } = props;

    const { inputType } = attribute.annotations;

    assert(inputType === "select-radiobuttons");

    const options = getFormOptions(attribute);

    const value = valueOrValues instanceof Array ? valueOrValues[0] : valueOrValues;

    return (
        <RadioGroup
            name={attribute.name}
            defaultValue={value}
            onValueChange={checked =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        return checked;
                    })()
                })
            }
        >
            {options.map(option => {
                return (
                    <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem
                            id={`${attribute.name}-${option}`}
                            value={option}
                            aria-invalid={props.displayableErrors.length !== 0}
                            disabled={attribute.readOnly}
                            checked={value === option}
                        />
                        <Label htmlFor={`${attribute.name}-${option}`}>
                            {getFormInputLabel(i18n, attribute, option)}
                        </Label>
                    </div>
                );
            })}
        </RadioGroup>
    );
}
