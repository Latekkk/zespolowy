import React from 'react';

import Layout from '@/Layouts/Layout';
import {Head} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import Badge from './Partials/Badge';




export default function Index(props: any) {
    const {t} = useTranslation(['badge'])
    console.log(props)
    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title={t('name')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Badge badges={props.badges}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
