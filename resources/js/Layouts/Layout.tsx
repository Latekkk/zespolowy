import {usePage} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, {useEffect, useRef} from "react";
import {Toast} from "primereact/toast";

export default function Layout({props = null, header, children}) {
    const pageProps = usePage().props;
    const {t} = useTranslation(['navbar'])
    const auth = pageProps?.auth?.user


    const toast = useRef<Toast>(null);

    const toastShow = (summary, severity, content) => {
        toast.current?.show({severity: severity, summary: summary, detail: content});
    };

    useEffect((() => {
        if (pageProps.toast !== undefined) {
            const toastData = pageProps.toast.value;
            if (toastData !== null) toastShow(toastData.summary || '', toastData.severity || 'info', t(toastData.content) || '')
        }
    }),[])

    return (
        <>
            {auth == undefined &&
                <GuestLayout header={header} props={pageProps}>
                    <main>
                        <div>
                            {toast.message && (
                                <div className="alert">{toast.message}</div>
                            )}
                        </div>
                        {children}
                    </main>
                </GuestLayout>
            }
            {auth != undefined &&
                <AuthenticatedLayout
                    header={header}
                    props={pageProps}>
                    <main>

                        <Toast ref={toast}/>
                        {children}
                    </main>
                </AuthenticatedLayout>
            }
        </>


    );
}

