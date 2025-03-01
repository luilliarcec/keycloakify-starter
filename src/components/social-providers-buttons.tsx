import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { I18n } from "@/login/i18n.ts";

interface SocialProvidersProps {
    social:
        | {
              displayInfo: boolean;
              providers?:
                  | {
                        loginUrl: string;
                        alias: string;
                        providerId: string;
                        displayName: string;
                        iconClasses?: string | undefined;
                    }[]
                  | undefined;
          }
        | undefined;
    realm: {
        password: boolean;
    };
    i18n: I18n;
}

export default function SocialProvidersButtons({
    social,
    realm,
    i18n
}: SocialProvidersProps) {
    if (!realm.password || !social?.providers || social.providers.length === 0) {
        return null;
    }

    const iconPrefix = "fa-brands";

    const { msg } = i18n;

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center space-x-4 my-4">
                <hr className="flex-grow border-gray-300" />
                <h2>{msg("identity-provider-login-label")}</h2>
                <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex flex-col space-y-2">
                {social.providers.map((...[p]) => (
                    <Button key={p.alias} asChild variant="outline" className="w-full">
                        <a id={`social-${p.alias}`} href={p.loginUrl}>
                            {p.iconClasses && (
                                <FontAwesomeIcon
                                    // @ts-ignore
                                    icon={[iconPrefix, p.iconClasses.split(" ")[1]]}
                                />
                            )}
                            {kcSanitize(p.displayName)}
                        </a>
                    </Button>
                ))}
            </div>
        </div>
    );
}
