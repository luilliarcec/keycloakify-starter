import { useState } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp.tsx";
import { Label } from "@/components/ui/label.tsx";
import InputError from "@/components/input-error.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form
                id="kc-otp-login-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
                method="post"
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className="mb-5">
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <Select name="selectedCredentialId" defaultValue={otpLogin.selectedCredentialId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {otpLogin.userOtpCredentials.map((otpCredential, index) => (
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

                <div className="flex flex-col gap-6">
                    <div className="grid gap-4 justify-items-center">
                        <Label htmlFor="otp">{msg("loginOtpOneTime")}</Label>
                        <InputOTP id="otp" name="otp" maxLength={6} autoComplete="off" autoFocus aria-invalid={messagesPerField.existsError("totp")}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {messagesPerField.existsError("totp") && <InputError>{kcSanitize(messagesPerField.get("totp"))}</InputError>}
                    </div>
                </div>

                <div className="mt-10">
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                    </div>
                    <div id="kc-form-buttons">
                        <Button id="kc-login" name="login" type="submit" className="w-full" disabled={isSubmitting}>
                            {msgStr("doLogIn")}
                        </Button>
                    </div>
                </div>
            </form>
        </Template>
    );
}
