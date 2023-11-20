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
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from "primereact/calendar";
import useFileList from "@/Functions/fileList";
import FileInput from "@/Components/FileInput";
import undefinedImages from "@/Functions/undefinedImages";
import StatusENUM from "@/Enums/StausEnum";

export default function Form(props) {
    const {t} = useTranslation(["trip"]);
    const globalTranslation = useTranslation(["global"]);
    const [selectedMountainSections, setSelectedMountainSections] = useState<MountainSection[]>([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [allPoints, setAllPoints] = useState(0);
    const trip = props.trip ?? null;
    const [mountainSections, setMountainSections] = useState<MountainSection[]>([]);
    const user = usePage().props.auth.user
    // const {data, setData, post, put, processing, errors, reset, clearErrors} = useForm({
    //     name: trip?.name || "",
    //     date: trip?.date || "",
    //     mountainSection: trip?.mountainSections || "",
    //     remember: true,
    //     img_url: undefined,
    // });
    const {data, setData, post, put, processing, errors, reset, clearErrors} = useForm({
        name: trip?.name || "",
        trip_id: props.trip.id,
        user_id: user.id,
        points_mountain_section: 0,
        date: '',
        guide: undefined,
        img_url: props.trip?.img_url,
        status: StatusENUM.PENDING,
        remember: true,
    })
    const mainPhoto = useFileList();
    const undefinedUrl = 'http://' + window.location.host + '/images/undefined/404.webp';
    const handleFile = (e) => {
        if (e.currentTarget.files) {
            setData("img_url", e.currentTarget.files[0]);
            console.log(e.currentTarget.files[0])
            mainPhoto.addFile(e.target.files)
            errors.img_url=''
        }
    };
    const toast = useRef<Toast>(null);
    const [visible, setVisible] = useState<boolean>(false);
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
        mainPhoto.clear();
    };
    let today = new Date();


    useEffect(() => {
        if (trip != null) {
            setSelectedMountainSections(trip.mountain_sections || []);
        }
        getMountainSections();
    }, []);

    let allPointsEntry = 0;
    let allPointsDescent = 0;
    let allPointsEntryDescent = 0;


    const getMountainSections = () => {
        MountainSectionService.getMountainsSections(selectedTrip?.id).then(
            (data: MountainSection[]) => {
                setMountainSections(data.data);
            }
        );
    };


    const header = (
        <div className={'h-[0px]'}>
            <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png"/>
        </div>
    );
    const footer = (
        <></>
    );

    function handleChange(e, keyName, val) {
        const key = e?.target?.id || keyName;
        let value = e?.target?.value || val || e || '';
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }
    {selectedMountainSections.map((section, index) => {
        const isRepetition = selectedMountainSections
            .slice(0, index)
            .some((prevSection) => prevSection.name === section.name);
        if (!isRepetition){
            allPointsEntry += parseFloat(section.entry_points);
            allPointsDescent += parseFloat(section.points_for_descent);
            allPointsEntryDescent += (parseFloat(section.entry_points) + parseFloat(section.points_for_descent));
        }
    })}

    const sendUserPoints = async () => {
        setData(data => ({
            ...data,
            points_mountain_section: allPointsEntry,
        }));
        if (!errors.img_url) {
            console.log(data);
            post(route('userPoints.store'), {
                onSuccess: (response) => {
                    console.log('User points stored successfully:', response);
                    setData((data) => ({
                        ...data,
                    }));
                },
                onError: (error) => {
                    console.error('Error storing user points:', error);
                },
            });
        }
    }
    // useEffect(() => {
    //     if (data.img_url !== undefined) {
    //         post(route('userPoints.store'), {
    //             onSuccess: (params) => {
    //                 setData((data) => ({
    //                     ...data
    //                 }));
    //             },
    //         });
    //     }
    // }, [data.points_mountain_section]);
    useEffect(() => {
        errors.img_url = "Pole zdjęcie jest wymagane.";
    }, [])


    const card = (
        <Card title={trip.name} subTitle={trip.date} footer={footer} header={header}
              className="w-full h-full">
            <div className="card scrollpanel-demo">
                <div className="flex flex-column md:flex-row gap-5">
                    <div className="flex-auto">
                        <div className="mb-4">

                            <p>{t("total.pointsEntry")}: {allPointsEntry}</p>
                            <h1>{t("trip.date")}</h1>
                            <Calendar value={data.date}
                                      onChange={(e) => handleChange(e.target.value, 'date', e.target.value)}
                                      maxDate={today} showIcon
                                      className={'bg-blue-500'}/>
                            <Dropdown value={props.guides.find((guide) => guide.id === data.guide)?.name}
                                      name={'guide'}
                                      onChange={(e) => handleChange(e.target.value.id, 'guide', e.target.value.id)}
                                      options={props.guides}
                                      optionLabel="name"
                                      editable
                                      placeholder={t('select.a.leader')}
                                      className="md:w-14rem"/>
                            <div className={'w-[350px] max-w-[350px] px-2'}>
                                <FileInput labelText={'img.url'}
                                           name='img_url'
                                           value={data.img_url}
                                           error={errors.img_url}
                                           onChange={handleFile}
                                />
                                <div>
                                    <h1>{globalTranslation.t("preview")}</h1>
                                    <img className=" w-[150px] h-[150px] object-contain"
                                         src={undefinedImages(mainPhoto?.files[0]?.url, '', undefinedUrl)}
                                         width="150" height="150" alt={'xD'}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row text-center">
                            <div>
                                <Button
                                    type="button"
                                    onClick={() => sendUserPoints()}
                                    children={t('trip.accept.points')}
                                    background="bg-blue-500"
                                    textColor={"text-white"}
                                    hoverColor={"bg-red-400"}
                                />
                            </div>
                        </div>
                        <ScrollPanel style={{width: '100%', height: '400px'}}>
                            {selectedMountainSections.map((section, index) => {
                                const isRepetition = selectedMountainSections
                                    .slice(0, index)
                                    .some((prevSection) => prevSection.name === section.name);
                                return (
                                    <TripChangeStatus trip={trip} section={section}
                                                      user={user} guides={props.guides} collapsed={index !== 0} duplicate={isRepetition}/>
                                )
                            })}
                        </ScrollPanel>
                    </div>
                </div>
            </div>
        </Card>
    )

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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="card flex justify-items-end p-2">
                            <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
                                {card}
                            </Sidebar>
                            <PrimeButton icon="pi pi-th-large text-end" className={'p-2 text-end w-[150px]'} onClick={() => setVisible(true)} > Full screen </PrimeButton>
                        </div>
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
