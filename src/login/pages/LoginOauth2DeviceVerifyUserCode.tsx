import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

export default function LoginOauth2DeviceVerifyUserCode(
    props: PageProps<Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("oauth2DeviceVerificationTitle")}
        >
            <form id="kc-user-verify-device-user-code-form" className="flex flex-col gap-6" action={url.oauth2DeviceVerificationAction} method="post">
                <div className="flex flex-col">
                    <div className="grid gap-2 justify-items-center">
                        <Label className="text-muted-foreground" htmlFor="device-user-code">
                            {msg("verifyOAuth2DeviceUserCode")}
                        </Label>

                        <InputOTP id="device-user-code" name="device_user_code" maxLength={6} autoComplete="off" autoFocus>
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
                    </div>
                </div>

                <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                    <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                </div>

                <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                    <div className={kcClsx("kcFormButtonsWrapperClass")}>
                        <Button type="submit" className="w-full">
                            {msgStr("doSubmit")}
                        </Button>
                    </div>
                </div>
            </form>
        </Template>
    );
}
