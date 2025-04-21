import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { AlertTriangle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faDownload, faCopy } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils.ts";

export default function LoginRecoveryAuthnCodeConfig(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const olRecoveryCodesListId = "kc-recovery-codes-list";

    const actionBtnCssClasses =
        "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500 cursor-pointer";

    useScript({ olRecoveryCodesListId, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("recovery-code-config-header")}
        >
            <div className="flex flex-col gap-6 text-muted-foreground">
                <Alert variant="warning">
                    <AlertTriangle />
                    <AlertTitle className="line-clamp-none">{msg("recovery-code-config-warning-title")}</AlertTitle>
                    <AlertDescription>
                        <p>{msg("recovery-code-config-warning-message")}</p>
                    </AlertDescription>
                </Alert>

                <ol id={olRecoveryCodesListId} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 text-base text-black my-4">
                    {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
                        <li key={index}>
                            <span>
                                {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
                            </span>
                        </li>
                    ))}
                </ol>

                {/* actions */}
                <div className="flex flex-row flex-wrap gap-4">
                    <button id="printRecoveryCodes" className={cn(actionBtnCssClasses)} type="button">
                        <FontAwesomeIcon icon={faPrint} /> {msg("recovery-codes-print")}
                    </button>
                    <button id="downloadRecoveryCodes" className={cn(actionBtnCssClasses)} type="button">
                        <FontAwesomeIcon icon={faDownload} /> {msg("recovery-codes-print")} {msg("recovery-codes-download")}
                    </button>
                    <button id="copyRecoveryCodes" className={cn(actionBtnCssClasses)} type="button">
                        <FontAwesomeIcon icon={faCopy} /> {msg("recovery-codes-print")} {msg("recovery-codes-copy")}
                    </button>
                </div>

                {/* confirmation checkbox */}
                <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="kcRecoveryCodesConfirmationCheck"
                            name="kcRecoveryCodesConfirmationCheck"
                            onCheckedChange={checked => {
                                //@ts-expect-error: This is inherited from the original code
                                document.getElementById("saveRecoveryAuthnCodesBtn").disabled = !checked;
                            }}
                        />
                        <Label htmlFor="kcRecoveryCodesConfirmationCheck" className="text-black">
                            {msg("recovery-codes-confirmation-message")}
                        </Label>
                    </div>
                </div>

                <form action={kcContext.url.loginAction} className="flex flex-col gap-6" id="kc-recovery-codes-settings-form" method="post">
                    <input
                        type="hidden"
                        name="generatedRecoveryAuthnCodes"
                        value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString}
                    />
                    <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
                    <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className="flex items-center space-x-3">
                            <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                            <Label htmlFor="logout-sessions">{msg("logoutOtherSessions")}</Label>
                        </div>
                    </div>

                    {isAppInitiatedAction ? (
                        <>
                            <Button
                                type="submit"
                                className="w-full"
                                id="saveRecoveryAuthnCodesBtn"
                                value={msgStr("recovery-codes-action-complete")}
                                disabled
                            >
                                {msgStr("recovery-codes-action-complete")}
                            </Button>
                            <Button type="submit" className="w-full" id="cancelRecoveryAuthnCodesBtn" name="cancel-aia" value="true">
                                {msg("recovery-codes-action-cancel")}
                            </Button>
                        </>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full"
                            id="saveRecoveryAuthnCodesBtn"
                            value={msgStr("recovery-codes-action-complete")}
                            disabled
                        >
                            {msgStr("recovery-codes-action-complete")}
                        </Button>
                    )}
                </form>
            </div>
        </Template>
    );
}
