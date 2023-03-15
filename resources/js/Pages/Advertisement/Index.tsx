import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Advertisement from './Partials/Advertisement';
export default function Index(  props: any) {

    const { t } = useTranslation(['advertisement'])

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title="Aktualności" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {props.advertisements.data.map((advertisement, index) => {
                               return <Advertisement
                                    key={'advertisement' + index}
                                    description={advertisement.description}
                                    title={advertisement.title}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
