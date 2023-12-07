import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Advertisement from './Partials/Advertisement';
import Pagination from "@/Components/Pagination";
import React, {useRef} from "react";
import {Toast} from "primereact/toast";
export default function Index(  props: any) {
    const toast = useRef<Toast>(null);

    const { t } = useTranslation(['advertisement'])
    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title={t('news')} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                            {props.advertisements.data.map((advertisement, index) => {
                               return <Advertisement
                                   toast={toast}
                                    key={'advertisement' + index}
                                    auth={props?.auth?.user}
                                    advertisement={advertisement}
                                />
                            })}
                        </div>
                        <Pagination props={props.advertisements}/>
                    </div>
                </div>
            </div>
            <Toast ref={toast}/>

        </Layout>
    );
}
