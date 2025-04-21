import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";

export default function DeleteCredential(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "delete-credential.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, credentialLabel } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <div className="flex flex-col gap-6">
                <div id="kc-delete-text" className="text-sm">
                    {msg("deleteCredentialMessage", credentialLabel)}
                </div>

                <form className="flex flex-col space-y-2" action={url.loginAction} method="POST">
                    <Button
                        className="w-full"
                        // variant="destructive"
                        name="accept"
                        id="kc-accept"
                        type="submit"
                        value={msgStr("doConfirmDelete")}
                    >
                        {msgStr("doConfirmDelete")}
                    </Button>

                    <Button className="w-full" variant="outline" name="cancel-aia" value={msgStr("doCancel")} id="kc-decline" type="submit">
                        {msgStr("doCancel")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
