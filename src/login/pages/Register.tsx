import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import TextLink from "@/components/text-link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error.tsx";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <form id="kc-register-form" className="flex flex-col gap-6" action={url.registrationAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}

                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="form-group">
                        <div className="w-full">
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                        </div>
                    </div>
                )}

                <div className={kcClsx("kcFormGroupClass")}>
                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <div id="kc-form-buttons">
                            <Button
                                className="w-full g-recaptcha"
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                            >
                                {msgStr("createAccount")}
                            </Button>
                        </div>
                    ) : (
                        <div id="kc-form-buttons">
                            <Button className="w-full" disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)} type="submit">
                                {msgStr("createAccount")}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    {msgStr("alreadyHaveAccount")}{" "}
                    <TextLink href={url.loginUrl} tabIndex={6}>
                        {msgStr("backToLogin")}
                    </TextLink>
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <>
            <div className="form-group">
                <div className="flex flex-col space-y-1 text-sm">
                    <div className="text-gray-500 dark:text-gray-400">
                        {msg("termsTitle")}
                    </div>
                    <div
                        id="kc-registration-terms-text"
                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                    >
                        {msg("termsText")}
                    </div>
                </div>
            </div>

            <div className="grid gap-1">
                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={areTermsAccepted}
                        onCheckedChange={checked => onAreTermsAcceptedValueChange(!!checked)}
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                    />
                    <Label htmlFor="termsAccepted">{msg("acceptTerms")}</Label>
                </div>
                {messagesPerField.existsError("termsAccepted") && (
                    <InputError>
                        {kcSanitize(messagesPerField.get("termsAccepted"))}
                    </InputError>
                )}
            </div>
        </>
    );
}
