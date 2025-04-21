import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        keycloakify({
            themeName: "authos-theme",
            themeVersion: "1.0.0",
            accountThemeImplementation: "Single-Page"
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    }
});
