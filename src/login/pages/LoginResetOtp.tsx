import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Label } from "@/components/ui/label.tsx";

export default function LoginResetOtp(props: PageProps<Extract<KcContext, { pageId: "login-reset-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, configuredOtpCredentials } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-reset-form" className="flex flex-col gap-6" action={url.loginAction} method="post">
                <p id="kc-otp-reset-form-description">{msg("otp-reset-description")}</p>

                {configuredOtpCredentials.userOtpCredentials.length > 0 && (
                    <div className="flex flex-col">
                        <div className="grid gap-2">
                            <Label htmlFor="selectedCredentialId">{msg("loginTotpDeviceName")}</Label>

                            <Select name="selectedCredentialId" defaultValue={configuredOtpCredentials.selectedCredentialId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => (
                                            <SelectItem id={`kc-otp-credential-${index}`} key={index} value={otpCredential.id}>
                                                {otpCredential.userLabel}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                    <Button id="kc-otp-reset-form-submit" className="w-full" type="submit" value={msgStr("doSubmit")}>
                        {msgStr("doSubmit")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
