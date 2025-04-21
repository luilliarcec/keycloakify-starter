import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import Errors from "@/components/errors.tsx";
import TextLink from "@/components/text-link.tsx";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <div className="flex flex-col">
                <ol id="kc-totp-settings" className="flex flex-col text-muted-foreground list-decimal space-y-4 px-4">
                    <li>
                        <p>{msg("loginTotpStep1")}</p>

                        <ul id="kc-totp-supported-apps" className="list-disc list-inside">
                            {totp.supportedApplications.map(app => (
                                <li key={app}>{advancedMsg(app)}</li>
                            ))}
                        </ul>
                    </li>

                    {mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p className="my-3 text-center">
                                    <span id="kc-totp-secret-key" className="font-semibold text-base text-black">
                                        {totp.totpSecretEncoded}
                                    </span>
                                </p>
                                <p>
                                    <TextLink href={totp.qrUrl} id="mode-barcode">
                                        {msg("loginTotpScanBarcode")}
                                    </TextLink>
                                </p>
                            </li>
                            <li>
                                <p>{msg("loginTotpManualStep3")}</p>
                                <ul className="text-black mt-2">
                                    <li id="kc-totp-type" className="w-full">
                                        {msg("loginTotpType")}: <span className="font-semibold">{msg(`loginTotp.${totp.policy.type}`)}</span>
                                    </li>
                                    <li id="kc-totp-algorithm" className="w-full">
                                        {msg("loginTotpAlgorithm")}: <span className="font-semibold">{totp.policy.getAlgorithmKey()}</span>
                                    </li>
                                    <li id="kc-totp-digits" className="w-full">
                                        {msg("loginTotpDigits")}: <span className="font-semibold">{totp.policy.digits}</span>
                                    </li>
                                    {totp.policy.type === "totp" ? (
                                        <li id="kc-totp-period" className="w-full">
                                            {msg("loginTotpInterval")}: <span className="font-semibold">{totp.policy.period}</span>
                                        </li>
                                    ) : (
                                        <li id="kc-totp-counter" className="w-full">
                                            {msg("loginTotpCounter")}: <span className="font-semibold">{totp.policy.initialCounter}</span>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </>
                    ) : (
                        <li>
                            <p>{msg("loginTotpStep2")}</p>
                            <figure className="flex w-full justify-center items-center">
                                <img
                                    id="kc-totp-secret-qr-code"
                                    className="size-[180px]"
                                    src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                    alt="Figure: Barcode"
                                />
                            </figure>
                            <br />
                            <p>
                                <TextLink href={totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </TextLink>
                            </p>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol>

                <form action={url.loginAction} className="flex flex-col gap-6 mt-4" id="kc-totp-settings-form" method="post">
                    <div className="flex flex-col">
                        <div className="grid gap-2">
                            <Label htmlFor="totp">
                                {msg("authenticatorCode")} <span className="required">*</span>
                            </Label>
                            <Input type="text" id="totp" name="totp" autoComplete="off" aria-invalid={messagesPerField.existsError("userLabel")} />
                            {messagesPerField.existsError("totp") && <Errors>{kcSanitize(messagesPerField.get("totp"))}</Errors>}
                        </div>
                        <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                        {mode && <input type="hidden" id="mode" value={mode} />}
                    </div>

                    <div className="flex flex-col">
                        <div className="grid gap-2">
                            <Label htmlFor="userLabel">
                                {msg("loginTotpDeviceName")} {totp.otpCredentials.length >= 1 && <span className="required">*</span>}
                            </Label>
                            <Input
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("userLabel")}
                            />
                            {messagesPerField.existsError("userLabel") && <Errors>{kcSanitize(messagesPerField.get("userLabel"))}</Errors>}
                        </div>
                    </div>

                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className="flex items-center space-x-3">
                            <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                            <Label htmlFor="logout-sessions">{msg("logoutOtherSessions")}</Label>
                        </div>
                    </div>

                    {isAppInitiatedAction ? (
                        <>
                            <div className="flex flex-col space-y-2">
                                <Button type="submit" className="w-full" id="saveTOTPBtn" value={msgStr("doSubmit")}>
                                    {msgStr("doSubmit")}
                                </Button>
                                <Button type="submit" className="w-full" id="cancelTOTPBtn" name="cancel-aia" value="true" variant="outline">
                                    {msg("doCancel")}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button type="submit" className="w-full" id="saveTOTPBtn" value={msgStr("doSubmit")}>
                            {msgStr("doSubmit")}
                        </Button>
                    )}
                </form>
            </div>
        </Template>
    );
}
