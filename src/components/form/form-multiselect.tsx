import { FormInputProps } from "@/utils/types.ts";
import { getFormInputLabel, getFormOptions } from "@/utils/utils.ts";
import { assert } from "keycloakify/tools/assert";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils.ts";

export default function FormMultiselect(props: FormInputProps) {
    const { attribute, dispatchFormAction, displayableErrors, i18n, valueOrValues } =
        props;

    const { inputType } = attribute.annotations;

    assert(inputType === "multiselect");

    const options = getFormOptions(attribute);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className={cn(
                        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-2 pb-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    )}
                    disabled={attribute.readOnly}
                    aria-invalid={displayableErrors.length !== 0}
                >
                    {i18n.msg(
                        "multiselectPlaceholder",
                        (valueOrValues.length - 1).toString()
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[360px]">
                    {options.map(option => (
                        <DropdownMenuCheckboxItem
                            key={option}
                            checked={
                                valueOrValues instanceof Array
                                    ? valueOrValues.includes(option)
                                    : valueOrValues === option
                            }
                            onCheckedChange={checked =>
                                dispatchFormAction({
                                    action: "update",
                                    name: attribute.name,
                                    valueOrValues: (() => {
                                        if (valueOrValues instanceof Array) {
                                            const newValues = [...valueOrValues];

                                            if (checked) {
                                                newValues.push(option);
                                            } else {
                                                newValues.splice(
                                                    newValues.indexOf(option),
                                                    1
                                                );
                                            }

                                            return newValues;
                                        }

                                        return checked ? option : "";
                                    })()
                                })
                            }
                        >
                            {getFormInputLabel(i18n, attribute, option)}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {valueOrValues instanceof Array &&
                valueOrValues.map(
                    value =>
                        value !== "" && (
                            <input
                                key={value}
                                type="hidden"
                                name={attribute.name}
                                value={value}
                            />
                        )
                )}
        </div>
    );
}
