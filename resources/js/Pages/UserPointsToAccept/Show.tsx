import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import Layout from "@/Layouts/Layout";
import "react-datepicker/dist/react-datepicker.css";
import {Card} from 'primereact/card';
import {Toast} from "primereact/toast";
import DataFormatter from "@/Components/DataFormatter";
import {MountainSection} from "@/Models/MountainSection";
import MountainSectionService from "@/Pages/MountainSection/service/MountainSectionService";
import {ScrollPanel} from "primereact/scrollpanel";
import MountainSectionShowOne from "@/Pages/UserPointsToAccept/Partials/MountainSectionShowOne";
import tripService from "@/Pages/Trip/service/TripService";
import TripService from "@/Pages/Trip/service/TripService";
import {Trip} from "@/Models/Trip";

export default function Show({userPoint}) {
    const {t} = useTranslation(["UserPointToAccept"]);
    const globalTranslation = useTranslation(["global"]);
    const toast = useRef<Toast>(null);
    const [selectedMountainSections, setSelectedMountainSections] = useState<MountainSection[]>([]);
    const [mountainSections, setMountainSections] = useState<MountainSection[]>([]);
    const header = (
        <div className={'h-[0px]'}>
            <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png"/>
        </div>
    );
    const footer = (
        <></>
    );
    useEffect(() => {
        if (userPoint.trip_id != null) {
            getMountainSections();
            setSelectedMountainSections(mountainSections || []);
        }
    }, []);


    let allPointsEntry = 0;
    let allPointsDescent = 0;
    let allPointsEntryDescent = 0;


    const getMountainSections = () => {
        TripService.getTrips(userPoint.trip_id.id).then(
            (data: Trip[]) => {
                {data.data.map((trip, index) => {
                    //console.log(trip);
                    if(trip.id ==userPoint.trip_id.id){
                        setMountainSections(trip.mountain_sections);
                    }
                })}
            }
        );
    };


    const card = (
        <div className={'flex  flex-col gap-y-2'}>
            <Card title={t('name')}>
                <p className="m-0">
                    {userPoint.trip_id.name}
                </p>
            </Card>
            <Card title={t('who.was.the.guide')}>
                <p className="m-0">
                    {userPoint.path_user ? userPoint.path_user.name : ''}
                </p>
            </Card>
            <Card title={t('participant')}>
                <p className="m-0">
                    {userPoint.user.name}
                </p>
            </Card>
            <Card title={t('when.it.was.held')}>
                <p className="m-0">
                    <DataFormatter date={userPoint.updated_at} />
                </p>
            </Card>
            <Card title={t('status')}>
                <p className="m-0">
                    {userPoint.status}
                </p>
            </Card>


            <Card title={t('mountainSectionsInThisTrip')}>
                <p className="m-0">
                    <ScrollPanel style={{width: '100%', height: '400px'}}>
                        {mountainSections.map((section, index) => {
                            const isRepetition = mountainSections
                                .slice(0, index)
                                .some((prevSection) => prevSection.name === section.name);
                            if (!isRepetition){
                                allPointsEntry += parseFloat(section.entry_points);
                                allPointsDescent += parseFloat(section.points_for_descent);
                                allPointsEntryDescent += (parseFloat(section.entry_points) + parseFloat(section.points_for_descent));
                            }
                            userPoint.points_mountain_section=allPointsEntry;
                            return (
                                <MountainSectionShowOne section={section}
                                                  collapsed={index !== 0} duplicate={isRepetition}/>
                            )
                        })}
                    </ScrollPanel>
                </p>
            </Card>

            <Card title={t('points.for')}>
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
