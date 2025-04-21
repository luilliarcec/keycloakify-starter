import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import TextLink from "@/components/text-link.tsx";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("pageExpiredTitle")}>
            <div className="flex flex-col gap-6">
                <p id="instruction0">
                    <span>{msg("pageExpiredMsg1")} </span>
                    <TextLink id="loginRestartLink" href={url.loginRestartFlowUrl}>
                        {msg("doClickHere")}
                    </TextLink>{" "}
                </p>

                <p id="instruction1">
                    <span>{msg("pageExpiredMsg2")} </span>
                    <TextLink id="loginContinueLink" href={url.loginAction}>
                        {msg("doClickHere")}
                    </TextLink>{" "}
                </p>
            </div>
        </Template>
    );
}
