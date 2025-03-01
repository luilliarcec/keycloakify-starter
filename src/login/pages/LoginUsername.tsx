import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import TextLink from "@/components/text-link.tsx";
import { Button } from "@/components/ui/button.tsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import SocialProvidersButtons from "@/components/social-providers-buttons.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import InputError from "@/components/input-error.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div className="text-muted-foreground text-center text-sm">
                    {msg("noAccount")}{" "}
                    <TextLink href={url.registrationUrl} tabIndex={8}>
                        {msg("doRegister")}
                    </TextLink>
                </div>
            }
            headerNode={msg("doLogIn")}
            socialProvidersNode={
                <SocialProvidersButtons social={social} i18n={i18n} realm={realm}></SocialProvidersButtons>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">
                                            {!realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                    ? msg("usernameOrEmail")
                                                    : msg("email")}
                                        </Label>
                                        <Input
                                            id="username"
                                            tabIndex={2}
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username")}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <InputError children={kcSanitize(messagesPerField.getFirstError("username", "password"))} />
                                        )}
                                    </div>
                                </div>
                            )}

                            {realm.rememberMe && !usernameHidden && (
                                <div className="flex items-center space-x-3">
                                    <Checkbox id="rememberMe" name="rememberMe" tabIndex={5} defaultChecked={!!login.rememberMe} />
                                    <Label htmlFor="rememberMe">{msg("rememberMe")}</Label>
                                </div>
                            )}

                            <Button className="w-full" tabIndex={7} disabled={isLoginButtonDisabled} name="login" id="kc-login" type="submit">
                                {msgStr("doLogIn")}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
