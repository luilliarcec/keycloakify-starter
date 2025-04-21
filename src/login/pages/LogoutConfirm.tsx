import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import TextLink from "@/components/text-link.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("logoutConfirmTitle")}>
            <div id="kc-logout-confirm" className="flex flex-col gap-6">
                <p>{msg("logoutConfirmHeader")}</p>

                <form className="form-actions" action={url.logoutConfirmAction} method="POST">
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />
                    <div className="flex flex-col space-y-2">
                        <div id="kc-form-options">
                            <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                        </div>
                        <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                            <Button tabIndex={4} className="w-full" name="confirmLogout" id="kc-logout" type="submit" value={msgStr("doLogout")}>
                                {msgStr("doLogout")}
                            </Button>
                        </div>
                        <div id="kc-info-message">
                            {!logoutConfirm.skipLink && client.baseUrl && (
                                <p>
                                    <TextLink className="text-sm" href={client.baseUrl}>
                                        {msg("backToApplication")}
                                    </TextLink>
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </Template>
    );
}
