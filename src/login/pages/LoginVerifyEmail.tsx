import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import TextLink from "@/components/text-link.tsx";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <div className="text-muted-foreground text-center text-sm">
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <TextLink href={url.loginAction}>{msg("doClickHere")}</TextLink>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </div>
            }
        >
            <p className="text-muted-foreground text-center text-sm">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
        </Template>
    );
}
