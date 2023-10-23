import React, { useRef } from "react";
import {useTranslation} from "react-i18next";
import Layout from "@/Layouts/Layout";
import "react-datepicker/dist/react-datepicker.css";
import {Card} from 'primereact/card';
import {Toast} from "primereact/toast";
import DataFormatter from "@/Components/DataFormatter";

export default function Show({userPoint}) {
    const {t} = useTranslation(["UserPointsToAccept"]);
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
        <div className={'flex  flex-col gap-y-2'}>
            <Card title="Nazwa ">
                <p className="m-0">
                    {userPoint.mountain_section.name}
                </p>
            </Card>
            <Card title="Kto był przewodnikiem">
                <p className="m-0">
                    {userPoint.path_user.name}
                </p>
            </Card>
            <Card title="Uczestnik">
                <p className="m-0">
                    {userPoint.user.name}
                </p>
            </Card>
            <Card title="Kiedy było odbyte">
                <p className="m-0">
                    <DataFormatter date={userPoint.updated_at} />
                </p>
            </Card>
            <Card title="Status">
                <p className="m-0">
                    {userPoint.status}
                </p>
            </Card>
            <Card title="Punkty za">
                <p className="m-0">
                    {userPoint.points_mountain_section}
                </p>
            </Card>

        </div>
    )

    return (<Layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {t("show.userPoint")}
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="flex p-6 text-gray-900 flex flex-col ">
                            {card}
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toast}/><Toast ref={toast}/>
        </Layout>
    );
}
