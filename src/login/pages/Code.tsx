import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import Errors from "@/components/errors.tsx";
import { Input } from "@/components/ui/input.tsx";

export default function Code(props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { code } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)}
        >
            <div id="kc-code" className="flex flex-col gap-6">
                {code.success ? (
                    <>
                        <p>{msg("copyCodeInstruction")}</p>
                        <Input id="code" readOnly={true} defaultValue={code.code} />
                    </>
                ) : (
                    code.error && <Errors>{kcSanitize(code.error)}</Errors>
                )}
            </div>
        </Template>
    );
}
