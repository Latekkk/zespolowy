import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useTranslation} from "react-i18next";

export default function Dashboard(props: { auth: any; errors: any; }) {
    const { t } = useTranslation(['translation'])
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">{t('you.are.logged.in')}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
