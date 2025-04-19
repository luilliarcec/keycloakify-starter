import { Fragment, useEffect } from "react";
import { useUserProfileForm } from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input.tsx";
import FormTextarea from "@/components/form/form-textarea.tsx";
import FormSelect from "@/components/form/form-select.tsx";
import FormInput from "@/components/form/form-input.tsx";
import { FormInputProps } from "@/utils/types.ts";
import FormErrors from "@/components/form/form-errors.tsx";
import FormCheckbox from "@/components/form/form-checkbox.tsx";
import FormRadio from "@/components/form/form-radio.tsx";
import FormGroupDescription from "@/components/form/form-group-description.tsx";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;

    const { advancedMsg } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const groupNameRef = { current: "" };

    return (
        <>
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <Fragment key={attribute.name}>
                        <FormGroupDescription attribute={attribute} groupNameRef={groupNameRef} i18n={i18n} kcClsx={kcClsx} />

                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                        )}

                        <div
                            className="flex flex-col gap-6"
                            style={{
                                display: attribute.name === "password-confirm" && !doMakeUserConfirmPassword ? "none" : undefined
                            }}
                        >
                            <div className="grid gap-2">
                                <Label htmlFor={attribute.name}>
                                    {advancedMsg(attribute.displayName ?? "")} {attribute.required && <> *</>}
                                </Label>

                                {attribute.annotations.inputHelperTextBefore !== undefined && (
                                    <div
                                        className="text-sm text-gray-500 dark:text-gray-400"
                                        id={`form-help-text-before-${attribute.name}`}
                                        aria-live="polite"
                                    >
                                        {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                    </div>
                                )}

                                <InputFactory
                                    attribute={attribute}
                                    valueOrValues={valueOrValues}
                                    displayableErrors={displayableErrors}
                                    dispatchFormAction={dispatchFormAction}
                                    i18n={i18n}
                                />

                                <FormErrors attribute={attribute} displayableErrors={displayableErrors} fieldIndex={undefined} />

                                {attribute.annotations.inputHelperTextAfter !== undefined && (
                                    <div
                                        className="text-sm text-gray-500 dark:text-gray-400"
                                        id={`form-help-text-after-${attribute.name}`}
                                        aria-live="polite"
                                    >
                                        {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                    </div>
                                )}

                                {AfterField !== undefined && (
                                    <AfterField
                                        attribute={attribute}
                                        dispatchFormAction={dispatchFormAction}
                                        displayableErrors={displayableErrors}
                                        valueOrValues={valueOrValues}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
                                )}
                                {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </>
    );
}

function InputFactory(props: FormInputProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        case "textarea":
            return <FormTextarea {...props} />;
        case "select":
            return <FormSelect {...props} />;
        case "select-radiobuttons":
            return <FormRadio {...props} />;
        case "multiselect-checkboxes":
            return <FormCheckbox {...props} />;
        // case "multiselect":
        //     return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <FormInput Component={Input} key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            if (attribute.name.includes("password")) {
                return (
                    <div>
                        <FormInput Component={PasswordInput} {...props} fieldIndex={undefined} />
                    </div>
                );
            }

            return <FormInput Component={Input} {...props} fieldIndex={undefined} />;
        }
    }
}
