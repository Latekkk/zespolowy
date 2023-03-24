import {usePage} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, {useEffect, useRef} from "react";
import {Toast} from "primereact/toast";

export default function Layout({props, header, children,}) {
    const {t} = useTranslation(['navbar'])
    console.log('tutaj propus', props)
    const auth = props.auth.user


    const toast = useRef<Toast>(null);

    const toastShow = (summary, severity, content) => {
        toast.current?.show({severity: severity, summary: summary, detail: content});
    };

    useEffect((() => {
        const toastData = props.toast.value;
        if (toastData !== null) toastShow(toastData.operation || '', toastData.type || 'info', t(toastData.message) || '')
    }),[])

    return (
        <>
            {auth == undefined &&
                <GuestLayout header={header} props={props}>
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
                    props={props}>
                    <main>

                        <Toast ref={toast}/>
                        {children}
                    </main>
                </AuthenticatedLayout>
            }
        </>


    );
}

