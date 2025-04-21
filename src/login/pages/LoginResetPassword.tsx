import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import TextLink from "@/components/text-link.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import InputError from "@/components/input-error.tsx";

export default function LoginResetPassword(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-reset-password.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={
                <div className="text-muted-foreground text-center text-sm">
                    {realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
                </div>
            }
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className="flex flex-col gap-6" action={url.loginAction} method="post">
                <div className="flex flex-col">
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
                            defaultValue={auth.attemptedUsername ?? ""}
                            type="text"
                            autoFocus
                            autoComplete="username"
                            aria-invalid={messagesPerField.existsError("username")}
                        />
                        {messagesPerField.existsError("username") && <InputError>{kcSanitize(messagesPerField.get("username"))}</InputError>}
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <div className="text-muted-foreground text-sm">
                        <TextLink href={url.loginUrl}>{msg("backToLogin")}</TextLink>
                    </div>

                    <Button className="w-full" type="submit">
                        {msgStr("doSubmit")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
