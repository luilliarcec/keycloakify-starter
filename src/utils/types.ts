import type { Attribute } from "keycloakify/login/KcContext";
import type {
    FormAction,
    FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import * as React from "react";
import type { I18n } from "@/login/i18n.ts";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";

export type FormInputProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
};

export type FormInputErrorsProps = {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex: number | undefined;
};

export type FormGroupDescriptionProps = {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
    i18n: I18n;
    kcClsx: KcClsx;
};
