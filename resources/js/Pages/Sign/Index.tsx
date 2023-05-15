import React, {useEffect, useRef, useState} from 'react';

import Layout from '@/Layouts/Layout';
import {useTranslation} from 'react-i18next';
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Badge} from "@/Models/Badge";
import {Head, Link} from '@inertiajs/react';
import PartialSign from "@/Pages/Sign/Partials/PartialSign";


export default function Index(props: any) {
    const signTranslation = useTranslation<string[]>(['sign'])
    const globalTranslation = useTranslation<string[]>(['global'])
    const [visible, setVisible] = useState<boolean>(false);

    const [modalData, setModalData] = useState<Badge>();
    const toast = useRef<Toast>(null);


    useEffect((() => {
        setVisible(true)
    }), [modalData])

    useEffect((() => {
        setVisible(false)
    }), [props.sign])

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{signTranslation.t('name')}</h2>}
        >
            <Head title={signTranslation.t('name')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <PartialSign
                            sign={props.sign}
                            auth={props.auth.user !== null}
                            setModalData={setModalData}
                            setVisible={setVisible}
                        />
                    </div>
                </div>
            </div>

            {
                modalData &&

                <Dialog header={globalTranslation.t('delete.descr') + modalData.hiking_trail} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <div className="flex flex-row gap-x-2 justify-end">
                        <Link href={route('sign.destroy', modalData.id)} method="delete" as="button" type="button"
                              className="block bg-red-600 hover:bg-red-500 px-4 py-2 text-left text-sm leading-5 text-white hover:bg-gray-100 focus:outline-none focus:bg-red-500 transition duration-150 ease-in-out">{globalTranslation.t('delete')}</Link>
                        <Button label={globalTranslation.t('cancel')} className={"bg-blue-600 hover:bg-red-500"}
                                onClick={() => setVisible(false)}/>
                    </div>
                </Dialog>
            }
            <Toast ref={toast}/>
        </Layout>
    );
}
