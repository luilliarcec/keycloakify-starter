import { useEffect } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";

export default function FrontchannelLogout(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "frontchannel-logout.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { logout } = kcContext;

    const { msg, msgStr } = i18n;

    useEffect(() => {
        if (logout.logoutRedirectUri) {
            window.location.replace(logout.logoutRedirectUri);
        }
    }, []);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            documentTitle={msgStr("frontchannel-logout.title")}
            headerNode={msg("frontchannel-logout.title")}
        >
            <div className="flex flex-col gap-6">
                <p>{msg("frontchannel-logout.message")}</p>

                <ul className="text-sm">
                    {logout.clients.map(client => (
                        <li key={client.name}>
                            {client.name}
                            <iframe src={client.frontChannelLogoutUrl} style={{ display: "none" }} />
                        </li>
                    ))}
                </ul>

                {logout.logoutRedirectUri && (
                    <Button asChild className="w-full">
                        <a id="continue" href={logout.logoutRedirectUri}>
                            {msg("doContinue")}
                        </a>
                    </Button>
                )}
            </div>
        </Template>
    );
}
