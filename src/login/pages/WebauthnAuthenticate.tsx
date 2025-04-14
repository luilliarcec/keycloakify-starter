import { Fragment } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/WebauthnAuthenticate.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import TextLink from "@/components/text-link.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons"

export default function WebauthnAuthenticate(props: PageProps<Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div className="text-muted-foreground text-center text-sm">
                    {msg("noAccount")}{" "}
                    <TextLink href={url.registrationUrl} tabIndex={8}>
                        {msg("doRegister")}
                    </TextLink>
                </div>
            }
            headerNode={msg("webauthn-login-title")}
        >
            <div id="kc-form-webauthn" className={kcClsx("kcFormClass")}>
                <form id="webauth" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="authenticatorData" name="authenticatorData" />
                    <input type="hidden" id="signature" name="signature" />
                    <input type="hidden" id="credentialId" name="credentialId" />
                    <input type="hidden" id="userHandle" name="userHandle" />
                    <input type="hidden" id="error" name="error" />
                </form>
                <div className={clsx(kcClsx("kcFormGroupClass"), "no-bottom-margin")}>
                    {authenticators && (
                        <>
                            <form id="authn_select" className={kcClsx("kcFormClass")}>
                                {authenticators.authenticators.map(authenticator => (
                                    // eslint-disable-next-line react/jsx-key
                                    <input type="hidden" name="authn_use_chk" value={authenticator.credentialId} />
                                ))}
                            </form>

                            {shouldDisplayAuthenticators && (
                                <>
                                    {authenticators.authenticators.length > 1 && (
                                        <p className="mb-4 font-semibold">
                                            {msg("webauthn-available-authenticators")}
                                        </p>
                                    )}
                                    <div className="mb-2 divide-y divide-gray-200 space-y-1">
                                        {authenticators.authenticators.map((authenticator, i) => (
                                            <div key={i} id={`kc-webauthn-authenticator-item-${i}`} className="relative flex items-center space-x-4 pb-2">
                                                <div className="shirnk-0">
                                                    <FontAwesomeIcon icon={faKey} className="text-gray-500" />
                                                </div>
                                                <div className="w-full">
                                                    <div
                                                        id={`kc-webauthn-authenticator-label-${i}`}
                                                        className="font-semibold"
                                                    >
                                                        {advancedMsg(authenticator.label)}
                                                    </div>
                                                    {authenticator.transports.displayNameProperties?.length && (
                                                        <div
                                                            id={`kc-webauthn-authenticator-transport-${i}`}
                                                            className="text-sm text-gray-500"
                                                        >
                                                            {authenticator.transports.displayNameProperties
                                                                .map((displayNameProperty, i, arr) => ({
                                                                    displayNameProperty,
                                                                    hasNext: i !== arr.length - 1
                                                                }))
                                                                .map(({ displayNameProperty, hasNext }) => (
                                                                    <Fragment key={displayNameProperty}>
                                                                        {advancedMsg(displayNameProperty)}
                                                                        {hasNext && <span>, </span>}
                                                                    </Fragment>
                                                                ))}
                                                        </div>
                                                    )}
                                                    <div className="text-sm text-gray-500 flex space-x-1">
                                                        <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>
                                                            {msg("webauthn-createdAt-label")}
                                                        </span>
                                                        <span id={`kc-webauthn-authenticator-created-${i}`}>
                                                            {authenticator.createdAt}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <Button id={authButtonId} className="w-full" tabIndex={7} type="submit">
                            {msgStr("webauthn-doAuthenticate")}
                        </Button>
                    </div>
                </div>
            </div>
        </Template>
    );
}
