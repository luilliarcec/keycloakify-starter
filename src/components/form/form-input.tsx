import { FormInputProps } from "@/utils/types.ts";
import * as React from "react";
import { assert } from "keycloakify/tools/assert";
import { PasswordInput } from "@/components/password-input.tsx";
import FormErrors from "@/components/form/form-errors.tsx";
import type { Attribute } from "keycloakify/login/KcContext";
import {
    FormAction,
    getButtonToDisplayForMultivaluedAttributeField
} from "keycloakify/login/lib/useUserProfileForm";
import type { I18n } from "@/login/i18n.ts";

export default function FormInput(
    props: FormInputProps & {
        fieldIndex: number | undefined;
        Component: React.ElementType;
    }
) {
    const {
        attribute,
        fieldIndex,
        dispatchFormAction,
        valueOrValues,
        i18n,
        displayableErrors,
        Component
    } = props;

    const { advancedMsgStr } = i18n;

    const getValue = () => {
        if (fieldIndex !== undefined) {
            assert(valueOrValues instanceof Array);
            return valueOrValues[fieldIndex];
        }

        assert(typeof valueOrValues === "string");

        return valueOrValues;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatchFormAction({
            action: "update",
            name: attribute.name,
            valueOrValues: (() => {
                if (fieldIndex !== undefined) {
                    assert(valueOrValues instanceof Array);

                    return valueOrValues.map((value, i) => {
                        if (i === fieldIndex) {
                            return event.target.value;
                        }

                        return value;
                    });
                }

                return event.target.value;
            })()
        });
    };

    const handleBlur = () => {
        dispatchFormAction({
            action: "focus lost",
            name: attribute.name,
            fieldIndex: fieldIndex
        });
    };

    return (
        <>
            <Component
                {...(Component === PasswordInput
                    ? {}
                    : {
                          type: (() => {
                              const { inputType } = attribute.annotations;

                              if (inputType?.startsWith("html5-")) {
                                  return inputType.slice(6);
                              }

                              return inputType ?? "text";
                          })()
                      })}
                id={attribute.name}
                name={attribute.name}
                value={getValue()}
                aria-invalid={
                    displayableErrors.find(error => error.fieldIndex === fieldIndex) !==
                    undefined
                }
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined
                        ? undefined
                        : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                pattern={attribute.annotations.inputTypePattern}
                size={
                    attribute.annotations.inputTypeSize === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeSize}`)
                }
                maxLength={
                    attribute.annotations.inputTypeMaxlength === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
                }
                minLength={
                    attribute.annotations.inputTypeMinlength === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeMinlength}`)
                }
                max={attribute.annotations.inputTypeMax}
                min={attribute.annotations.inputTypeMin}
                step={attribute.annotations.inputTypeStep}
                {...Object.fromEntries(
                    Object.entries(attribute.html5DataAnnotations ?? {}).map(
                        ([key, value]) => [`data-${key}`, value]
                    )
                )}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }

                assert(valueOrValues instanceof Array);

                return (
                    <div className="flex flex-col mb-2 text-sm space-y-1">
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={valueOrValues}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />

                        <FormErrors
                            attribute={attribute}
                            displayableErrors={displayableErrors}
                            fieldIndex={fieldIndex}
                        />
                    </div>
                );
            })()}
        </>
    );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;

    const { msg } = i18n;

    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({
        attribute,
        values,
        fieldIndex
    });

    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    return (
        <div className="flex flex-row text-xs -mt-1">
            {hasRemove && (
                <>
                    <button
                        id={`kc-remove${idPostfix}`}
                        type="button"
                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                        onClick={() =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: values.filter((_, i) => i !== fieldIndex)
                            })
                        }
                    >
                        {msg("remove")}
                    </button>
                    {hasAdd ? <>&nbsp;|&nbsp;</> : null}
                </>
            )}
            {hasAdd && (
                <button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
                >
                    {msg("addValue")}
                </button>
            )}
        </div>
    );
}
