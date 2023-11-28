import React, {useEffect, useRef, useState} from 'react';

import Layout from '@/Layouts/Layout';
import {useTranslation} from 'react-i18next';
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Badge} from "@/Models/Badge";
import {Head, Link, router} from '@inertiajs/react';
import PartialBadge from "@/Pages/Badge/Partials/PartialBadge";


export default function Index(props: any) {
    const badgeTranslation = useTranslation<string[]>(['badge'])
    const globalTranslation = useTranslation<string[]>(['global'])
    const [visible, setVisible] = useState<boolean>(false);

    const [modalData, setModalData] = useState<Badge>();
    const toast = useRef<Toast>(null);


    useEffect((() => {
        setVisible(true)
    }), [modalData])

    useEffect((() => {
        setVisible(false)
    }), [props.badges])
    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{badgeTranslation.t('name')}</h2>}
        >
            <Head title={badgeTranslation.t('name')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <PartialBadge
                            badges={props.badges}
                            auth={props.auth.user !== null}
                            setModalData={setModalData}
                            setVisible={setVisible}
                        />
                    </div>
                </div>
            </div>

            {
                modalData &&

                <Dialog header={globalTranslation.t('delete.descr') + modalData.name} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <div className="flex flex-row gap-x-2 justify-end">

                        <Button label={globalTranslation.t('delete')} className="block bg-red-600 hover:bg-red-500 px-4 py-2 text-left text-sm leading-5
                                    text-white focus:outline-none focus:bg-red-500 transition duration-150 ease-in-out"
                                onClick={() =>router.delete(route('badge.destroy', modalData.id),{
                                    onSuccess:params => {
                                        toast.current?.show({severity: params.props.toast.value.severity, summary: params.props.toast.value.summary, detail: params.props.toast.value.content});
                                    }
                                })}/>
                        <Button label={globalTranslation.t('cancel')} className={"bg-blue-600 hover:bg-red-500"}
                                onClick={() => setVisible(false)}/>
                    </div>
                </Dialog>
            }
            <Toast ref={toast}/>
        </Layout>
    );
}
