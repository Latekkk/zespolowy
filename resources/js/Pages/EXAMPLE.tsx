import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
export default function Index(  props: any) {

    const { t } = useTranslation(['nazwa_pliku_z_tłumaczeniami'])

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title="Aktualności" />

            {/*Reszta kodu...*/}
        </Layout>
    );
}
