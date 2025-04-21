import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import TextLink from "@/components/text-link.tsx";
import InputError from "@/components/input-error.tsx";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div className="flex flex-col gap-6 text-muted-foreground text-center">
                <InputError>
                    {kcSanitize(message.summary)}
                </InputError>

                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <TextLink id="backToApplication" href={client.baseUrl} tabIndex={8}>
                        {msg("backToApplication")}
                    </TextLink>
                )}
            </div>
        </Template>
    );
}
