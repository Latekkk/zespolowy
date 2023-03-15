import {usePage} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Layout({props, header, children,}) {
    const {t} = useTranslation(['navbar'])
    const {toast} = usePage().props

    const auth = props.auth.user
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
                        <div>
                            {toast.message && (
                                <div className="alert">{toast.message}</div>
                            )}
                        </div>
                        {children}
                    </main>
                </AuthenticatedLayout>
            }
        </>


    );
}

