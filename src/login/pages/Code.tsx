import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import InputError from "@/components/input-error.tsx";
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
            <div id="kc-code">
                {code.success ? (
                    <>
                        <p className="text-sm mb-4">{msg("copyCodeInstruction")}</p>
                        <Input id="code" readOnly={true} defaultValue={code.code} />
                    </>
                ) : (
                    code.error && (
                        <InputError>
                            {kcSanitize(code.error)}
                        </InputError>
                    )
                )}
            </div>
        </Template>
    );
}
