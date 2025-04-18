import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { ChevronRight } from "lucide-react";

export default function SelectAuthenticator(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "select-authenticator.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, auth } = kcContext;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={msg("loginChooseAuthenticator")}
        >
            <form id="kc-select-credential-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className="flex flex-col space-y-4">
                    {auth.authenticationSelections.map((authenticationSelection, i) => (
                        <div key={i}>
                            <Separator />

                            <Button
                                variant="ghost"
                                type="submit"
                                name="authenticationExecution"
                                value={authenticationSelection.authExecId}
                                className="py-12 my-2 w-full text-sm"
                            >
                                <div className="flex w-[90%] text-left text-wrap">
                                    <div className={kcClsx("kcSelectAuthListItemIconClass")}>
                                        <i className={kcClsx("kcSelectAuthListItemIconPropertyClass", authenticationSelection.iconCssClass)} />
                                    </div>

                                    <div className={kcClsx("kcSelectAuthListItemBodyClass")}>
                                        <div className={kcClsx("kcSelectAuthListItemHeadingClass")}>
                                            {advancedMsg(authenticationSelection.displayName)}
                                        </div>
                                        <div className="text-muted-foreground font-normal">
                                            {advancedMsg(authenticationSelection.helpText)}
                                        </div>
                                    </div>
                                    <div className={kcClsx("kcSelectAuthListItemFillClass")} />
                                </div>

                                <ChevronRight className="size-4"/>
                            </Button>
                        </div>
                    ))}
                </div>
            </form>
        </Template>
    );
}
