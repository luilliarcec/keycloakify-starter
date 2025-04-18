import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import TextLink from "@/components/text-link.tsx";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <p id="instruction1" className="text-sm mb-2">
                {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
            </p>
            <p id="instruction2" className="text-sm mb-2">
                {msg("emailLinkIdp2")} <TextLink href={url.loginAction}>{msg("doClickHere")}</TextLink> {msg("emailLinkIdp3")}
            </p>
            <p id="instruction3" className="text-sm mb-2">
                {msg("emailLinkIdp4")} <TextLink href={url.loginAction}>{msg("doClickHere")}</TextLink> {msg("emailLinkIdp5")}
            </p>
        </Template>
    );
}
