import type { Attribute } from "keycloakify/login/KcContext";
import type { I18n } from "@/login/i18n.ts";

export const getFormOptions = (attribute: Attribute): string[] => {
    walk: {
        const { inputOptionsFromValidation } = attribute.annotations;

        if (inputOptionsFromValidation === undefined) {
            break walk;
        }

        const validator = (
            attribute.validators as Record<string, { options?: string[] }>
        )[inputOptionsFromValidation];

        if (validator === undefined) {
            break walk;
        }

        if (validator.options === undefined) {
            break walk;
        }

        return validator.options;
    }

    return attribute.validators.options?.options ?? [];
};

export const getFormInputLabel = (i18n: I18n, attribute: Attribute, option: string) => {
    const { advancedMsg } = i18n;

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;

        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(
            `${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`
        );
    }

    return option;
};
