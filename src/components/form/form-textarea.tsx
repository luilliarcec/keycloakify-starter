import { FormInputProps } from "@/utils/types.ts";
import { assert } from "keycloakify/tools/assert";
import { Textarea } from "@/components/ui/textarea.tsx";

export default function FormTextarea(props: FormInputProps) {
    const { attribute, dispatchFormAction, displayableErrors, valueOrValues } = props;

    assert(typeof valueOrValues === "string");

    return (
        <Textarea
            id={attribute.name}
            name={attribute.name}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            cols={
                attribute.annotations.inputTypeCols === undefined
                    ? undefined
                    : parseInt(`${attribute.annotations.inputTypeCols}`)
            }
            rows={
                attribute.annotations.inputTypeRows === undefined
                    ? undefined
                    : parseInt(`${attribute.annotations.inputTypeRows}`)
            }
            maxLength={
                attribute.annotations.inputTypeMaxlength === undefined
                    ? undefined
                    : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
            }
            value={valueOrValues}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}
