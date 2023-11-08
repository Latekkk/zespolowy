import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import Layout from "@/Layouts/Layout";
import "react-datepicker/dist/react-datepicker.css";
import {Card} from 'primereact/card';
import {Toast} from "primereact/toast";
import PrimaryButton from "@/Components/PrimaryButton";
import {router} from "@inertiajs/react";
import DataFormatter from "@/Components/DataFormatter";

export default function Edit({userPoint}) {
    const {t} = useTranslation(["userPointToAccept"]);
    const globalTranslation = useTranslation(["global"]);
    const toast = useRef<Toast>(null);

    console.log(userPoint);

    const header = (
        <div className={'h-[0px]'}>
            <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png"/>
        </div>
    );
    const footer = (
        <></>
    );

    const card = (
        <div>
            <div className={'flex flex-col gap-y-4'}>
               <div className={'flex flex-row gap-x-4'}>
                   <Card title={t('name')} className={'w-full'}>
                       <p className="m-0">
                           {userPoint.mountain_section.name}
                       </p>
                   </Card>
                   <Card title={t('who.was.the.guide')} className={'w-full'}>
                       <p className="m-0">
                           {userPoint.path_user.name}
                       </p>
                   </Card>
               </div>
                <div className={'flex flex-row gap-x-4'}>
                    <Card title={t('participant')} className={'w-full'}>
                        <p className="m-0">
                            {userPoint.user.name}
                        </p>
                    </Card>
                    <Card title={t('when.it.was.held')} className={'w-full'}>
                        <p className="m-0">
                            <DataFormatter date={userPoint.updated_at} />
                        </p>
                    </Card>
                </div>
                <div className={'flex flex-row gap-x-4'}>
                    <Card title={t('status')} className={'w-full'}>
                        <p className="m-0">
                            {userPoint.status}
                        </p>
                    </Card>
                    <Card title={t('points.for')} className={'w-full'}>
                        <p className="m-0">
                            {userPoint.points_mountain_section}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )

    const changeStatus = (status) => {
        router.post(route('userPointsToAccept.store'), {userPoint: userPoint.id, status: status })
    }



    return (<Layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {t("show.userTrip")}
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="flex p-6 text-gray-900 flex flex-col ">
                            {card}
                        </div>
                        <div className={'flex flex-row gap-x-2 p-2 pr-6 items-end justify-end '}>
                            <PrimaryButton onClick={() => changeStatus('APPROVED')} disabled={false}>{t("accept")}</PrimaryButton>
                            <PrimaryButton
                                className="bg-red-700 hover:bg-red-500 focus:bg-red-500"
                                onClick={() => changeStatus('REJECTED')}
                            >{t("reject")}</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toast}/><Toast ref={toast}/>
        </Layout>
    );
}
