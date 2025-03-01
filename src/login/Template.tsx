import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import AppLogoIcon from "@/components/app-logo-icon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import TextInfo from "@/components/text-info.tsx";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <div className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-9 w-9 items-center justify-center">
                        <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            {enabledLanguages.length > 1 && (
                                <div className="w-full flex justify-end mb-5">
                                    <Select onValueChange={value => (window.location.href = value)} tabIndex={1}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={currentLanguage.label} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                                <SelectItem key={languageTag} id={`language-${i + 1}`} value={href}>
                                                    {label}
                                                </SelectItem>
                                                // <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                //     <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
                                                //         {label}
                                                //     </a>
                                                // </li>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {(() => {
                                const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                    <CardTitle className="text-xl">{headerNode}</CardTitle>
                                ) : (
                                    <div className="flex space-x-2 justify-center">
                                        <Label className="text-lg">{auth.attemptedUsername}</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <a href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                                        <ArrowRightEndOnRectangleIcon className="size-5"></ArrowRightEndOnRectangleIcon>
                                                    </a>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <Label>{msg("restartLoginTooltip")}</Label>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                );

                                if (displayRequiredFields) {
                                    return (
                                        <div className={kcClsx("kcContentWrapperClass")}>
                                            <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                                <span className="subtitle">
                                                    <span className="required">*</span>
                                                    {msg("requiredFields")}
                                                </span>
                                            </div>
                                            <div className="col-md-10">{node}</div>
                                        </div>
                                    );
                                }

                                return node;
                            })()}
                        </CardHeader>
                        <CardContent className="px-10 py-8">
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <TextInfo variant={message.type}>
                                    <Label className="font-normal text-sm mb-4">{kcSanitize(message.summary)}</Label>
                                </TextInfo>
                            )}

                            {children}

                            {auth !== undefined && auth.showTryAnotherWayLink && (
                                <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        <a
                                            href="#"
                                            id="try-another-way"
                                            onClick={() => {
                                                document.forms["kc-select-try-another-way-form" as never].submit();
                                                return false;
                                            }}
                                        >
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </div>
                                </form>
                            )}

                            {socialProvidersNode}

                            {displayInfo && <div className="mt-4">{infoNode}</div>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
