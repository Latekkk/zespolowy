import './bootstrap';
import '../css/app.css';
import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

import './i18n';

createInertiaApp({

    title: (title: string) => `${title} - ${appName}`,
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(
                <App {...props} />
        );
    },
    resolve: (name: string) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    progress: {
        color: '#4B5563',
    },
});
