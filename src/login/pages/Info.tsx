import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import TextLink from "@/components/text-link.tsx";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ?? message.summary)
                    }}
                />
            }
        >
            <div className="flex flex-col gap-6 text-muted-foreground text-center">
                <p
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = message.summary?.trim();

                                if (requiredActions) {
                                    html += " <b>";

                                    html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                    html += "</b>";
                                }

                                return html;
                            })()
                        )
                    }}
                />
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <TextLink id="backToApplication" href={pageRedirectUri}>
                                {msg("backToApplication")}
                            </TextLink>
                        );
                    }

                    if (actionUri) {
                        return (
                            <TextLink id="backToApplication" href={actionUri}>
                                {msg("proceedWithAction")}
                            </TextLink>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <TextLink id="backToApplication" href={client.baseUrl}>
                                {msg("backToApplication")}
                            </TextLink>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
