import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Head, useForm, usePage} from "@inertiajs/react";
import {MountainSection} from "@/Models/MountainSection";
import Layout from "@/Layouts/Layout";
import Button from "@/Components/Button";
import MountainSectionService from "@/Pages/MountainSection/service/MountainSectionService";
import {ScrollPanel} from "primereact/scrollpanel";
import "react-datepicker/dist/react-datepicker.css";
import {Card} from 'primereact/card';
import TripChangeStatus from "@/Pages/Trip/Partials/TripChangeStatus";
import {Toast} from "primereact/toast";

export default function Form(props) {
    const {t} = useTranslation(["trip"]);
    const globalTranslation = useTranslation(["global"]);
    const [selectedMountainSections, setSelectedMountainSections] = useState<MountainSection[]>([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const trip = props.trip ?? null;
    const [mountainSections, setMountainSections] = useState<MountainSection[]>([]);
    const user = usePage().props.auth.user
    const {data, setData, post, put, processing, errors, reset, clearErrors} = useForm({
        name: trip?.name || "",
        date: trip?.date || "",
        mountainSection: trip?.mountainSections || "",
        remember: true,
    });
    const toast = useRef<Toast>(null);

    function handleSubmit(e) {
        e.preventDefault();
        trip === null
            ? post(route("trip.store", data))
            : put(route("trip.update", {data, trip: trip.id}));
    }

    const setDefaultForm = () => {
        reset();
        clearErrors();
        setSelectedMountainSections([]);
    };

    useEffect(() => {
        if (trip != null) {
            setSelectedMountainSections(trip.mountain_sections || []);
        }
        getMountainSections();
    }, []);

    const getMountainSections = () => {
        MountainSectionService.getMountainsSections(selectedTrip?.id).then(
            (data: MountainSection[]) => {
                setMountainSections(data.data);
            }
        );
    };

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png"/>
    );
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Wróć" icon="pi pi-check"/>
        </div>
    );

    return (<Layout
            props={props}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {t("creating.editing.a.trip")}
                </h2>
            }
        >
            <Head title={t("show.a.trip")}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                            <Card title={trip.name} subTitle={trip.date} footer={footer} header={header}
                                  className="w-full">
                                <div className="card scrollpanel-demo">
                                    <div className="flex flex-column md:flex-row gap-5">
                                        <div className="flex-auto">
                                            <ScrollPanel style={{width: '100%', height: '400px'}}>
                                                {selectedMountainSections.map((section) => (
                                                    <TripChangeStatus trip={trip} section={section}
                                                                      user={user}/>
                                                ))}
                                            </ScrollPanel>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toast}/><Toast ref={toast}/>
        </Layout>
    );
}
