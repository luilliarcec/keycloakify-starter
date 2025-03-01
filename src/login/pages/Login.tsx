import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import SocialProvidersButtons from "@/components/social-providers-buttons.tsx";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div className="text-muted-foreground text-center text-sm">
                    {msg("noAccount")}{" "}
                    <TextLink href={url.registrationUrl} tabIndex={8}>
                        {msg("doRegister")}
                    </TextLink>
                </div>
            }
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
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <InputError message={kcSanitize(messagesPerField.getFirstError("username", "password"))} />
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">{msg("password")}</Label>
                                        {realm.resetPasswordAllowed && (
                                            <TextLink tabIndex={6} href={url.loginResetCredentialsUrl} className="ml-auto text-sm">
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
                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                        <InputError message={kcSanitize(messagesPerField.getFirstError("username", "password"))} />
                                    )}
                                </div>
                            </div>

                            {realm.rememberMe && !usernameHidden && (
                                <div className="flex items-center space-x-3">
                                    <Checkbox id="rememberMe" name="rememberMe" tabIndex={5} defaultChecked={!!login.rememberMe} />
                                    <Label htmlFor="rememberMe">{msg("rememberMe")}</Label>
                                </div>
                            )}

                            <input type="hidden" name="credentialId" value={auth.selectedCredential} />

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
