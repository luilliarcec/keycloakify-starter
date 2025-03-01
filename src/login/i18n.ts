/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            noAccount: "Don't have an account?",
            doRegister: "Sign up",
            createAccount: "Create account",
            backToLogin: "Log in",
            alreadyHaveAccount: "Already have an account?",
            registerTitle: "Create an account",
            loginAccountTitle: "Log in to your account",
        },
        es: {
            noAccount: "¿No tienes una cuenta?",
            doRegister: "Registrate aquí",
            createAccount: "Crear cuenta",
            backToLogin: "Inicia sesión",
            alreadyHaveAccount: "¿Ya tienes una cuenta creada?",
            registerTitle: "Crear una cuenta",
            loginAccountTitle: "Ingresar a tu cuenta",
        },
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
