import React, {useEffect, useRef, useState} from 'react';

import Layout from '@/Layouts/Layout';
import { Inertia } from '@inertiajs/inertia'
import {useTranslation} from 'react-i18next';
import Badge from './Partials/Badge';
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";

import {Head, Link} from '@inertiajs/react';

interface Badge {
    'id': number,
    'name': string,
    'point': number,
}

export default function Index(props: any) {
    const {t} = useTranslation(['badge'])
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title={t('name')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Badge
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

                <Dialog header={`Czy chcesz usunąć : "${modalData.name}"`} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <div className="flex flex-row gap-x-2 justify-end">
                        <Link href={route('badge.destroy', modalData.id)} method="delete" as="button" type="button" className="block bg-red-600 hover:bg-red-500 px-4 py-2 text-left text-sm leading-5 text-white hover:bg-gray-100 focus:outline-none focus:bg-red-500 transition duration-150 ease-in-out">Usuń</Link>
                        <Button label="Anuluj" className={"bg-blue-600 hover:bg-red-500"}
                                onClick={() => setVisible(false)}/>
                    </div>
                </Dialog>
            }
            <Toast ref={toast}/>
        </Layout>
    );
}
