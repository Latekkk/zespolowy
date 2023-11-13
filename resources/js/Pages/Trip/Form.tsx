import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Head, useForm} from "@inertiajs/react";
import {MountainSection} from "@/Models/MountainSection";
import Layout from "@/Layouts/Layout";
import DropdownWithErrorMessage from "@/Components/DropdownWithErrorMessage";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import MountainSectionService from "@/Pages/MountainSection/service/MountainSectionService";
import Trip from "@/Pages/Trip/Partials/Trip";
import {ScrollPanel} from "primereact/scrollpanel";
import "react-datepicker/dist/react-datepicker.css";
import {Dialog} from "primereact/dialog";
import PrimaryButton from "@/Components/PrimaryButton";
import Heading1 from "@/Components/Heading1";
import Heading3 from "@/Components/Heading3";

export default function Form(props) {
    const {t} = useTranslation(["trip"]);
    const globalTranslation = useTranslation(["global"]);
    const [selectedMountainSections, setSelectedMountainSections] = useState<MountainSection[]>([]);
    const [visibleMountainSection, setVisibleMountainSection] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const trip = props.trip ?? null;
    const [mountainSections, setMountainSections] = useState<MountainSection[]>([]);
    const [countPoints, setCountPoints] = useState(0)
    const {data, setData, post, put, processing, errors, reset, clearErrors} = useForm({
        name: trip?.name || "",
        date: trip?.date || "",
        mountainSection: props.trip.mountain_sections || [],
        remember: true,
    });

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

    const handleSelectedMountainSection = (mountainSection) => {
        setSelectedMountainSections(mountainSection);
    };

    const handleRemoveMountainSection = (mountainSection) => {
        const updatedMountainSections = data.mountainSection.filter(
            (section) => section.id !== mountainSection.id
        );
        setData((data) => ({
            ...data,
            ["mountainSection"]: updatedMountainSections,
        }));
    };

    const handleAddMountainSection = (selected) => {

        let tmpMountainSection = selectedMountainSections;
        tmpMountainSection.selected = selected
        getMountainSections()
        const updatedMountainSections = [...data?.mountainSection, tmpMountainSection ]
        setSelectedMountainSections(null);
        setData((data) => ({
            ...data,
            ["mountainSection"]: updatedMountainSections,
        }));
    };

    const getName = (section) => {
        const endName = section?.end_point.name;
        const startName = section?.start_point.name;
        const selected = section?.selected;

        if (section?.end_point_id === selected) {
            return `${endName} - ${startName}: ${section.points_for_descent}`
        } else {
            return `${startName} - ${endName}: ${section?.entry_points}`

        }

    }

    const getPoints = () => {
        let count = 0;

        data?.mountainSection.forEach((mountainSection) => {
            const selected = mountainSection?.selected;
            if (mountainSection?.end_point_id === selected) {
                count += mountainSection.points_for_descent
            } else {
                count += mountainSection?.entry_points
            }
        })


        return count
    }

        return (<Layout
            props={props}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {t("creating.editing.a.trip")}
                </h2>
            }
        >
            <Head title={t("creating.editing.a.trip")}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-2 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                            <div className="flex  text-gray-900 flex-row gap-x-2 gap-y-4 items-center">
                                <Input
                                    labelText={t("trip.name")}
                                    name="name"
                                    extraClass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    value={data.name}
                                    error={errors.name}
                                    onChange={handleChange}
                                    placeholder={t("enter.trip.name.ph")}
                                />
                                <Input
                                    labelText={t("trip.date")}
                                    name="date"
                                    value={data.date}
                                    error={errors.date}
                                    onChange={handleChange}
                                    placeholder={t("trip.date.ph")}
                                    type="date"
                                    extraClass="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                <PrimaryButton type={'button'} onClick={() => setVisibleMountainSection(true)} className={'h-12'}>{t("addMountainSection")}</PrimaryButton>
                            </div>
                            <div className={'my-3 bg-gray-200 border-gray-300 rounded-md p-2 shadow w-1/5'}>
                                <span>Łączna ilośc punktów:  {getPoints()}</span>
                            </div>

                            <div className={'mb-3 bg-gray-200 border-gray-300 rounded-md p-2 shadow w-1/5'}>
                                <h3>{t("selected.mountain.sections")}</h3>
                            </div>
                            <div className="card scrollpanel-demo">
                                <div className="flex flex-column md:flex-row gap-5">
                                    <div className="flex-auto">
                                        <ScrollPanel style={{width: '100%', height: '400px'}}>
                                            {data?.mountainSection?.map((section) => (
                                                <Trip section={section} label={getName(section)} key={section.id}
                                                      handleRemoveMountainSection={handleRemoveMountainSection}/>
                                            ))}
                                        </ScrollPanel>
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
                    </form>
                </div>
            </div>


            <Dialog header="Header" visible={visibleMountainSection} maximizable style={{width: '50vw'}}
                    onHide={() => setVisibleMountainSection(false)}>
                    <DropdownWithErrorMessage
                        label={t("mountainSection")}
                        value={selectedMountainSections}
                        valueTemplate={selectedMountainSections}
                        onChange={handleSelectedMountainSection}
                        options={mountainSections}
                        optionLabel="name"
                        placeholder={t("select.a.mountain.section")}
                        className="w-full md:w-14rem"
                    />

                    <Heading3>Wybierz punkt początkowy</Heading3>
                    <div className="flex flex-row gap-x-2 pt-2">
                        <PrimaryButton type={'button'} className={' w-1/2 text-center p-2 line-clamp-1'} onClick={() => handleAddMountainSection(selectedMountainSections?.start_point_id)}>{selectedMountainSections?.start_point?.name ?? '-'}</PrimaryButton>
                        <PrimaryButton type={'button'} className={' w-1/2 text-center p-2 line-clamp-1'} onClick={() => handleAddMountainSection(selectedMountainSections?.end_point_id)}>{selectedMountainSections?.end_point?.name ?? '-'}</PrimaryButton>
                    </div>
            </Dialog>
        </Layout>
    )
        ;
}
