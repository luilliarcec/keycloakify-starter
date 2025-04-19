import { FormInputProps } from "@/utils/types.ts";
import { assert } from "keycloakify/tools/assert";
import { getFormInputLabel, getFormOptions } from "@/utils/utils.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

export default function FormCheckbox(props: FormInputProps) {
    const { attribute, dispatchFormAction, i18n, valueOrValues } = props;

    const { inputType } = attribute.annotations;

    assert(inputType === "multiselect-checkboxes");

    const options = getFormOptions(attribute);

    return options.map(option => {
        return (
            <div key={option} className="flex items-center space-x-3">
                <Checkbox
                    id={`${attribute.name}-${option}`}
                    name={attribute.name}
                    value={option}
                    aria-invalid={props.displayableErrors.length !== 0}
                    disabled={attribute.readOnly}
                    checked={
                        valueOrValues instanceof Array
                            ? valueOrValues.includes(option)
                            : valueOrValues === option
                    }
                    onCheckedChange={checked =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: (() => {
                                if (valueOrValues instanceof Array) {
                                    const newValues = [...valueOrValues];

                                    if (checked) {
                                        newValues.push(option);
                                    } else {
                                        newValues.splice(newValues.indexOf(option), 1);
                                    }

                                    return newValues;
                                }

                                return checked ? option : "";
                            })()
                        })
                    }
                />
                <Label htmlFor={`${attribute.name}-${option}`}>
                    {getFormInputLabel(i18n, attribute, option)}
                </Label>
            </div>
        );
    });
}
