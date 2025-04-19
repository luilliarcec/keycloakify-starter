import { FormGroupDescriptionProps } from "@/utils/types.ts";
import { assert } from "keycloakify/tools/assert";

export default function FormGroupDescription(props: FormGroupDescriptionProps) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;

    const { advancedMsg } = i18n;

    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";

        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);

            return (
                <div
                    className={kcClsx("kcFormGroupClass")}
                    {...Object.fromEntries(
                        Object.entries(attribute.group.html5DataAnnotations).map(
                            ([key, value]) => [`data-${key}`, value]
                        )
                    )}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText =
                            groupDisplayHeader !== ""
                                ? advancedMsg(groupDisplayHeader)
                                : attribute.group.name;

                        return (
                            <div className={kcClsx("kcContentWrapperClass")}>
                                <label
                                    id={`header-${attribute.group.name}`}
                                    className={kcClsx("kcFormGroupHeader")}
                                >
                                    {groupHeaderText}
                                </label>
                            </div>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription =
                            attribute.group.displayDescription ?? "";

                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(
                                groupDisplayDescription
                            );

                            return (
                                <div className={kcClsx("kcLabelWrapperClass")}>
                                    <label
                                        id={`description-${attribute.group.name}`}
                                        className={kcClsx("kcLabelClass")}
                                    >
                                        {groupDescriptionText}
                                    </label>
                                </div>
                            );
                        }

                        return null;
                    })()}
                </div>
            );
        }
    }

    return null;
}
