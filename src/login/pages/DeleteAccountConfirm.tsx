import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import { AlertTriangle } from "lucide-react";

export default function DeleteAccountConfirm(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "delete-account-confirm.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, triggered_from_aia } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("deleteAccountConfirm")}>
            <form action={url.loginAction} className="flex flex-col gap-6" method="post">
                <Alert variant="warning">
                    <AlertTriangle className="size-4" />
                    <AlertDescription className="font-semibold">{msg("irreversibleAction")}</AlertDescription>
                </Alert>

                <p>{msg("deletingImplies")}</p>

                <ul className="list-disc list-inside text-muted-foreground">
                    <li>{msg("loggingOutImmediately")}</li>
                    <li>{msg("errasingData")}</li>
                </ul>

                <p className="delete-account-text">{msg("finalDeletionConfirmation")}</p>

                <div id="kc-form-buttons" className="flex flex-col space-y-2">
                    <Button
                        // variant="destructive"
                        className="w-full"
                        type="submit"
                        value={msgStr("doConfirmDelete")}
                    >
                        {msgStr("doConfirmDelete")}
                    </Button>
                    {triggered_from_aia && (
                        <Button className="w-full" type="submit" name="cancel-aia" value="true" variant="outline">
                            {msgStr("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
