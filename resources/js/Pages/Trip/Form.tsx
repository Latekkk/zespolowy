// import React, {useEffect, useState} from "react";
// import {useTranslation} from "react-i18next";
// import {Head, useForm} from "@inertiajs/react";
// import {MountainSection} from "@/Models/MountainSection";
// import Layout from "@/Layouts/Layout";
// import DropdownWithErrorMessage from "@/Components/DropdownWithErrorMessage";
// import Input from "@/Components/Input";
// import Button from "@/Components/Button";
// import MountainSectionService from "@/Pages/MountainSection/service/MountainSectionService";
// export default function Form(props) {
//     const {t} = useTranslation(['trip'])
//     const globalTranslation = useTranslation(['global'])
//
//     const [selectedTrip, setSelectedTrip] = useState(null);
//     const [totalPoints, setTotalPoints] = useState(null)
//     const trip = props.trip ?? null;
//     const [mountainSections, setMountainSections] = useState<MountainSection[]>([]);
//
//
//     const {data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
//         name: trip?.name || "",
//         totalPoints: trip?.totalPoints || "",
//         remember: true
//     })
//
//     function handleChange(e, keyName, val) {
//         const key = e?.target?.id || keyName;
//         let value = e?.target?.value || val || e || '';
//         setData(data => ({
//             ...data,
//             [key]: value,
//         }))
//     }
//
//     function handleSubmit(e) {
//         e.preventDefault()
//         trip === null ?post(route('trip.store',data)): put(route('trip.update', trip.id))
//     }
//
//     const setDefaultForm = () => {
//         reset();
//         clearErrors()
//     }
//
//     useEffect(()=>{
//         if(trip != null){
//             setMountainSections(findMountainSection(trip.id));
//         }
//         getMountainSections()
//     },[])
//
//     useEffect(() => {
//         getMountainSections()
//     }, [totalPoints]);
//
//     function findMountainSection(id){
//         const result = props.mountainSections.find(mountainSections =>mountainSections.id === id);
//         return result || null;
//     }
//     const getMountainSections = () => {
//         MountainSectionService.getMountainsSections(selectedTrip?.id).then((data: MountainSection[]) => {
//             setMountainSections(data.data);
//         });
//         // get mountainSection from trip
//     }
//
//     return (
//         <Layout
//             props={props}
//             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight" >{t('creating.editing.a.trip')}</h2>}
//         >
//             <Head title={t('creating.editing.a.trip')}/>
//
//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <form onSubmit={handleSubmit}>
//                         <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                             <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
//                                 <Input labelText={t('entrance.trip.name')}
//                                        name='name'
//                                        value={data.name}
//                                        error={errors.name}
//                                        onChange={handleChange}
//                                        placeholder={t('entrance.trip.name.ph')}
//                                 />
//                                 <DropdownWithErrorMessage label={t('mountainSection')}
//                                                           value={mountainSections?.name}
//                                                           valueTemplate={mountainSections?.name }
//                                                           onChange={(e) => {setTotalPoints(e)}}
//                                                           options={mountainSections}
//                                                           optionLabel="name"
//                                                           placeholder={t('select.a.mountainSection')}
//                                                           className="w-full md:w-14rem"
//                                 />
//                                 <p> {t('trip.totalPoints')}:{totalPoints}</p>
//                                 <div className='flex flex-row gap-x-2 w-full justify-end mt-4'>
//                                     <Button type='button' onClick={setDefaultForm} disabled={processing} children={globalTranslation.t('reset')} background="bg-red-500" textColor={"text-white"} hoverColor={"bg-red-400"}/>
//                                     <Button type='submit' disabled={processing} children={globalTranslation.t('submit')} background="bg-blue-500" textColor={"text-white"} hoverColor={"bg-blue-400"}/>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </Layout>
//     );
// }
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Head, useForm } from "@inertiajs/react";
// @ts-ignore
import { MountainSection } from "@/Models/MountainSection";
import Layout from "@/Layouts/Layout";
import DropdownWithErrorMessage from "@/Components/DropdownWithErrorMessage";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import MountainSectionService from "@/Pages/MountainSection/service/MountainSectionService";

export default function Form(props) {
    const { t } = useTranslation(["trip"]);
    const globalTranslation = useTranslation(["global"]);

    const [selectedTrip, setSelectedTrip] = useState(null);
    const [totalPoints, setTotalPoints] = useState(0);
    const trip = props.trip ?? null;
    const [mountainSections, setMountainSections] = useState<MountainSection[]>([]);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        name: trip?.name || "",
        totalPoints: trip?.totalPoints || "",
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
            ? post(route("trip.store", { ...data, mountainSections: selectedMountainSections }))
            : put(route("trip.update", { ...data, mountainSections: selectedMountainSections }));
    }

    const setDefaultForm = () => {
        reset();
        clearErrors();
        setSelectedMountainSections([]);
        setTotalPoints(null);
    };

    useEffect(() => {
        if (trip != null) {
            setMountainSections(findMountainSection(trip.id));
            setSelectedMountainSections(trip.mountainSections);
            recalculateTotalPoints(trip.mountainSections);
        }
        getMountainSections();
    }, []);

    useEffect(() => {
        getMountainSections();

        if(trip){
            // recalculateTotalPoints(trip.mountainSections);
            console.log(trip.mountainSections);
        }

    }, [totalPoints]);
    useEffect(() => {
            recalculateTotalPoints(selectedMountainSections);
    }, [selectedMountainSections]);

    function findMountainSection(id) {
        const result = props.mountainSections.find(
            (mountainSections) => mountainSections.id === id
        );
        return result || null;
    }

    const getMountainSections = () => {
        MountainSectionService.getMountainsSections(selectedTrip?.id).then(
            (data: MountainSection[]) => {
                setMountainSections(data.data);
            }
        );
        // get mountainSection from trip
    };

    const recalculateTotalPoints = (sections) => {

        console.log(sections);
        const points = sections.reduce(
            (accumulator, section) => accumulator + section.points_for_descent,
            0
        );
        //tu są points for descent jak to ogarnaćć
        console.log(points);
        setTotalPoints(points);
    };

    const handleAddMountainSection = (mountainSection) => {
        const updatedMountainSections = [...selectedMountainSections, mountainSection];
        setSelectedMountainSections(updatedMountainSections);
        recalculateTotalPoints(updatedMountainSections);
    };

    const handleRemoveMountainSection = (mountainSection) => {
        const updatedMountainSections = selectedMountainSections.filter(
            (section) => section.id !== mountainSection.id
        );
        setSelectedMountainSections(updatedMountainSections);
        recalculateTotalPoints(updatedMountainSections);
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
                                    value={data.name}
                                    error={errors.name}
                                    onChange={handleChange}
                                    placeholder={t("entrance.trip.name.ph")}
                                />
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
                                <p> {t('trip.totalPoints')}: {isNaN(totalPoints) ? 0 : totalPoints}</p>
                                <div>
                                    <h3>{t("selectedMountainSections")}</h3>
                                    {selectedMountainSections.map((section) => (
                                        <div key={section.id}>
                                            <span>{section.name}</span>
                                            <Button
                                                type="button"
                                                onClick={() => handleRemoveMountainSection(section)}
                                                disabled={processing}
                                                children={globalTranslation.t("remove")}
                                                background="bg-red-500"
                                                textColor={"text-white"}
                                                hoverColor={"bg-red-400"}
                                            />
                                        </div>
                                    ))}
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
