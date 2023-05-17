import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Head, useForm } from "@inertiajs/react";
import { MountainSection } from "@/Models/MountainSection";
import Layout from "@/Layouts/Layout";
import DropdownWithErrorMessage from "@/Components/DropdownWithErrorMessage";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import MountainSectionService from "@/Pages/MountainSection/service/MountainSectionService";
import Trip from "@/Pages/Trip/Partials/Trip";
import {ScrollPanel} from "primereact/scrollpanel";
import "react-datepicker/dist/react-datepicker.css";

export default function Form(props) {
    const { t } = useTranslation(["trip"]);
    const globalTranslation = useTranslation(["global"]);

    const [selectedTrip, setSelectedTrip] = useState(null);
    const trip = props.trip ?? null;
    const [mountainSections, setMountainSections] = useState<MountainSection[]>([]);

    const {data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: trip?.name || "",
        date: trip?.date || "",
        mountainSection: trip?.mountainSections || "",
        remember: true,
    });
    const [selectedMountainSections, setSelectedMountainSections] = useState<
        MountainSection[]
    >([]);

    function handleChange(e, keyName, val) {
        const key = e?.target?.id || keyName;
        let value = e?.target?.value || val || e || "";
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        trip === null
            ? post(route("trip.store", data))
            : put(route("trip.update", { data,trip: trip.id }));
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

    const handleAddMountainSection = (mountainSection) => {
        const updatedMountainSections = [...selectedMountainSections, mountainSection];
        setSelectedMountainSections(updatedMountainSections);
        setData((data) => ({
            ...data,
            ["mountainSection"]: updatedMountainSections,
        }));
    };

    const handleRemoveMountainSection = (mountainSection) => {
        const updatedMountainSections = selectedMountainSections.filter(
            (section) => section.id !== mountainSection.id
        );
        setSelectedMountainSections(updatedMountainSections);
        setData((data) => ({
            ...data,
            ["mountainSection"]: updatedMountainSections,
        }));
    };

    return (<Layout
            props={props}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {t("creating.editing.a.trip")}
                </h2>
            }
        >
            <Head title={t("creating.editing.a.trip")} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                                <Input
                                    labelText={t("entrance.trip.name")}
                                    name="name"
                                    extraClass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={data.name}
                                    error={errors.name}
                                    onChange={handleChange}
                                    placeholder={t("entrance.trip.name.ph")}
                                />
                                <div className="block w-40">
                                <div className="mb-4"></div>
                                <Input
                                    labelText={t("entrance.trip.date")}
                                    name="date"
                                    value={data.date}
                                    error={errors.date}
                                    onChange={handleChange}
                                    placeholder={t("entrance.trip.date.ph")}
                                    type="date"
                                    extraClass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                </div>
                                <div className="mb-4"></div>
                                <DropdownWithErrorMessage
                                    label={t("mountainSection")}
                                    value={mountainSections?.name}
                                    valueTemplate={mountainSections?.name}
                                    onChange={handleAddMountainSection}
                                    options={mountainSections}
                                    optionLabel="name"
                                    placeholder={t("select.a.mountainSection")}
                                    className="w-full md:w-14rem"
                                />
                                <div className="mb-4"></div>
                                <div className=''>
                                    <h3>{t("selectedMountainSections")}</h3>
                                    <div className="mb-4"></div>
                                    <div className="card scrollpanel-demo">
                                        <div className="flex flex-column md:flex-row gap-5">
                                            <div className="flex-auto">
                                                <ScrollPanel style={{ width: '100%', height: '400px'}} >
                                                    {selectedMountainSections.map((section) => (
                                                        <Trip section={section} handleRemoveMountainSection={handleRemoveMountainSection}/>
                                                    ))}
                                                </ScrollPanel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 w-full justify-end mt-4">
                                    <Button
                                        type="button"
                                        onClick={setDefaultForm}
                                        disabled={processing}
                                        children={globalTranslation.t("reset")}
                                        background="bg-red-500"
                                        textColor={"text-white"}
                                        hoverColor={"bg-red-400"}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        children={globalTranslation.t("submit")}
                                        background="bg-blue-500"
                                        textColor={"text-white"}
                                        hoverColor={"bg-blue-400"}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
