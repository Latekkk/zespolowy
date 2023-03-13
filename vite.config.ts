import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import EnvironmentPlugin from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';
import i18n from 'laravel-react-i18n/vite';

export default defineConfig({
    server: {
        hmr: {
            host: 'localhost'
        }
    },
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
        i18n(),
        tsconfigPaths(),
        svgr(),
        EnvironmentPlugin('all')
    ],
    base: './',
    resolve: {
        alias: {
            '@': '/resources/js',
            '@Svg': '/resources/svg',
            '@Components': '/resources/js/Components',
            '@Layouts': '/resources/js/Layouts',
            '@Pages': '/resources/js/Pages',
        },
    },
    build: {
        sourcemap: true,
    },
})
