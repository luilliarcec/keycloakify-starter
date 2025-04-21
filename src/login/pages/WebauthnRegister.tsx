import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

export default function WebauthnRegister(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "webauthn-register.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, isSetRetry, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("webauthn-registration-title")}
        >
            <form id="register" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="error" name="error" />
                    <div id="kc-form-options" className="flex items-center space-x-3 mb-4">
                        <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                        <Label htmlFor="logout-sessions">{msg("logoutOtherSessions")}</Label>
                    </div>
                </div>
            </form>

            <div className="flex flex-col space-y-2">
                <Button id={authButtonId} type="submit" className="w-full">
                    {msgStr("doRegisterSecurityKey")}
                </Button>

                {!isSetRetry && isAppInitiatedAction && (
                    <form action={url.loginAction} id="kc-webauthn-settings-form" method="post">
                        <Button id="cancelWebAuthnAIA" variant="outline" type="submit" className="w-full" name="cancel-aia">
                            {msgStr("doCancel")}
                        </Button>
                    </form>
                )}
            </div>
        </Template>
    );
}
