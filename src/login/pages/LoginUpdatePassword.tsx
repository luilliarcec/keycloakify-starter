import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label.tsx";
import { PasswordInput } from "@/components/password-input.tsx";
import InputError from "@/components/input-error.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className="flex flex-col gap-6" action={url.loginAction} method="post">
                <div className="flex flex-col">
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password-new">{msg("passwordNew")}</Label>
                        </div>
                        <PasswordInput
                            id="password-new"
                            name="password-new"
                            autoFocus
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        />
                        {messagesPerField.existsError("password") && (
                            <InputError>
                                {kcSanitize(messagesPerField.get("password"))}
                            </InputError>
                        )}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password-new">{msg("passwordConfirm")}</Label>
                        </div>
                        <PasswordInput
                            id="password-confirm"
                            name="password-confirm"
                            autoFocus
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        />
                        {messagesPerField.existsError("password-confirm") && (
                            <InputError>
                                {kcSanitize(messagesPerField.get("password-confirm"))}
                            </InputError>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className="flex items-center space-x-3">
                            <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true}/>
                            <Label htmlFor="logout-sessions">{msg("logoutOtherSessions")}</Label>
                        </div>
                    </div>

                    <div id="kc-form-buttons" className="flex flex-col space-y-2">
                        <Button className="w-full" value={msgStr("doSubmit")} type="submit">
                            {msgStr("doSubmit")}
                        </Button>

                        {isAppInitiatedAction && (
                            <Button className="w-full" variant="outline" name="cancel-aia" value="true" type="submit">
                                {msgStr("doCancel")}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}
