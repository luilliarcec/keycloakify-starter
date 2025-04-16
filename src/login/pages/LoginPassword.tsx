import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label.tsx";
import TextLink from "@/components/text-link.tsx";
import { Input } from "@/components/ui/input.tsx";
import InputError from "@/components/input-error.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { realm, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginAccountTitle")}
            displayMessage={!messagesPerField.existsError("password")}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <form
                        className="flex flex-col gap-6"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">{msg("password")}</Label>
                                    {realm.resetPasswordAllowed && (
                                        <TextLink tabIndex={5} href={url.loginResetCredentialsUrl} className="ml-auto text-sm">
                                            {msg("doForgotPassword")}
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    tabIndex={2}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                />
                                {messagesPerField.existsError("password") && (
                                    <InputError>
                                        {kcSanitize(messagesPerField.getFirstError("password"))}
                                    </InputError>
                                )}
                            </div>
                        </div>

                        <Button className="w-full" tabIndex={4} disabled={isLoginButtonDisabled} name="login" id="kc-login" type="submit">
                            {msgStr("doLogIn")}
                        </Button>
                    </form>
                </div>
            </div>
        </Template>
    );
}
