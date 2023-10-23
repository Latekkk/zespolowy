import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Head, useForm, usePage} from "@inertiajs/react";
import {MountainSection} from "@/Models/MountainSection";
import Layout from "@/Layouts/Layout";
import Button from "@/Components/Button";
import { Button as PrimeButton } from 'primereact/button';
import MountainSectionService from "@/Pages/MountainSection/service/MountainSectionService";
import {ScrollPanel} from "primereact/scrollpanel";
import "react-datepicker/dist/react-datepicker.css";
import {Card} from 'primereact/card';
import TripChangeStatus from "@/Pages/Trip/Partials/TripChangeStatus";
import {Toast} from "primereact/toast";
import {Sidebar} from "primereact/sidebar";
import {use} from "i18next";

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
        <div>
            <Card title="Title">
                <p className="m-0">
                    {userPoint.name}
                </p>
            </Card>
            <Card title="STATUS">
                <p className="m-0">
                    {userPoint.status}
                </p>
            </Card>
            <Card title="Title">
                <p className="m-0">
                    {userPoint.points_mountain_section}
                </p>
                <p>
                    {userPoint.points_mountain_section === 'ENTRY' &&  userPoint.mountain_section.entry_points}
                    {userPoint.points_mountain_section === 'DESCENT' &&  userPoint.mountain_section.entry_points}
                </p>
            </Card>
            <Card title="Nazwa ">
                <p className="m-0">
                    {userPoint.mountain_section.name}
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
