"use client";
import * as React from "react";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                className={className}
                {...props}
            />
            <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                {showPassword ? (
                    <Eye className="h-4 w-4" onClick={togglePasswordVisibility} />
                ) : (
                    <EyeOff className="h-4 w-4" onClick={togglePasswordVisibility} />
                )}
            </div>
        </div>
    );
}

export { PasswordInput };
