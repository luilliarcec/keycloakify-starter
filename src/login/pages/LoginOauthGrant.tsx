import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import TextLink from "@/components/text-link.tsx";

export default function LoginOauthGrant(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-oauth-grant.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url, oauth, client } = kcContext;

    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            bodyClassName="oauth"
            headerNode={
                <>
                    {client.attributes.logoUri && <img src={client.attributes.logoUri} />}
                    <p>{client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)}</p>
                </>
            }
        >
            <div id="kc-oauth" className="flex flex-col gap-6">
                <h3 className="font-semibold">
                    {msg("oauthGrantRequest")}
                </h3>

                {oauth.clientScopesRequested.length > 0 && (
                    <ul className="font-semibold">
                        {oauth.clientScopesRequested.map(clientScope => (
                            <li key={clientScope.consentScreenText}>
                                <span>{advancedMsg(clientScope.consentScreenText)}</span>
                                {clientScope.dynamicScopeParameter && (
                                    <>
                                        :<span className="text-muted-foreground">{clientScope.dynamicScopeParameter}</span>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {(client.attributes.policyUri || client.attributes.tosUri) && (
                    <div className="flex flex-col">
                        <h3 className="font-semibold">
                            {client.name ? msg("oauthGrantInformation", advancedMsgStr(client.name)) : msg("oauthGrantInformation", client.clientId)}
                        </h3>
                        {client.attributes.tosUri && (
                            <>
                                <div className="text-muted-foreground">
                                    {msg("oauthGrantReview")}
                                    <TextLink target="_blank" href={client.attributes.tosUri}>
                                        {msg("oauthGrantTos")}
                                    </TextLink>
                                </div>
                            </>
                        )}
                        {client.attributes.policyUri && (
                            <>
                                <div className="text-muted-foreground">
                                    {msg("oauthGrantReview")}
                                    <TextLink target="_blank" href={client.attributes.policyUri}>
                                        {msg("oauthGrantPolicy")}
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <form className="form-actions" action={url.oauthAction} method="POST">
                    <input type="hidden" name="code" value={oauth.code} />
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div id="kc-form-options">
                            <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                        </div>

                        <div id="kc-form-buttons" className="flex flex-col space-y-2">
                            <Button id="kc-login" type="submit" className="w-full" name="accept">
                                {msgStr("doYes")}
                            </Button>
                            <Button id="kc-cancel" variant="outline" type="submit" className="w-full" name="cancel">
                                {msgStr("doNo")}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Template>
    );
}
