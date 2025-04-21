import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <div className="flex flex-col gap-6">
                <div id="kc-terms-text">{msg("termsText")}</div>
                <form className="form-actions flex flex-col space-y-2" action={url.loginAction} method="POST">
                    <Button id="kc-accept" type="submit" className="w-full" name="accept">
                        {msgStr("doAccept")}
                    </Button>
                    <Button id="kc-decline" variant="outline" type="submit" className="w-full" name="cancel">
                        {msgStr("doDecline")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
