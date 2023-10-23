import Button from "@/Components/Button";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Inertia} from "@inertiajs/inertia";
import PointsMountainSectionENUM from "@/Enums/PointsMountainSectionENUM ";
import StatusENUM from "@/Enums/StausEnum";
import {Calendar} from "primereact/calendar";
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {Fieldset} from "primereact/fieldset";
import {User} from "@/Models/User";
import FileInput from "@/Components/FileInput";
import undefinedImages from "@/Functions/undefinedImages";
import useFileList from "@/Functions/fileList";
import {router, useForm, usePage} from "@inertiajs/react";


export default function TripChangeStatus({section, trip, user, guides, collapsed}) {
    const globalTranslation = useTranslation(["global"]);
    const pageProps = usePage().props;
    const [date, setDate] = useState<string | Date | Date[] | null>(null);
    let today = new Date();

    const undefinedUrl = 'http://' + window.location.host + '/images/undefined/404.webp';
    const mainPhoto = useFileList();

    const {data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        trip_id:'',
        user_id: user.id,
        mountain_section_id: section.id,
        points_mountain_section: undefined,
        date: '',
        guide: undefined,
        img_url: undefined,
        status: StatusENUM.PENDING,
        remember: true,
    })

    const handleFile = (e) => {
        if (e.currentTarget.files) {
            setData("img_url", e.currentTarget.files[0]);
            mainPhoto.addFile(e.target.files)
        }
    };

    function handleChange(e, keyName, val) {
        const key = e?.target?.id || keyName;
        let value = e?.target?.value || val || e || '';
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    const setDefaultForm = () => {
        reset();
        mainPhoto.clear();
        clearErrors()
    }

    const sendUserPoints = async (type) => {
        setData(data => ({
            ...data,
            points_mountain_section: type,
        }));
    }

    useEffect(() => {
        if (data.points_mountain_section !== undefined) {
            post(route('userPoints.store'), {
                onSuccess: params => {
                    setData(data => ({
                        ...data,
                        points_mountain_section: undefined,
                    }));
                }
            });
        }
    }, [data.points_mountain_section])

    return (
        <div key={'tripChangeStatus-' + section.id}
             className='flex flex-row border-1 border border-gray-400 shadow-xl mx-2 p-2 text-left items-center w-[1000px] mb-6'>
            <Fieldset legend={section.name} className={'w-full flex flex-row'} toggleable collapsed={collapsed}>
                <div className={'flex flex-row gap-x-2'}>
                    <div className={'flex flex-col w-full gap-y-2'}>
                        <div className={'flex flex-col gap-y-2'}>
                            <Calendar value={data.date} onChange={(e) => handleChange(e.target.value, 'date', e.target.value)} maxDate={today} showIcon
                                      className={'bg-blue-500'}/>
                            <Dropdown value={guides.find((guide) => guide.id === data.guide)?.name}
                                      name={'guide'}
                                      onChange={(e) =>handleChange(e.target.value.id, 'guide', e.target.value.id)} options={guides}
                                      optionLabel="name"
                                      editable placeholder="wybierz przodownika" className="w-full md:w-14rem"/>
                        </div>
                    </div>
                    <div className={'w-[250px] max-w-[250px] px-2'}>
                            <FileInput labelText={'img.url'}
                                   name='img_url'
                                   value={data.img_url}
                                   error={errors.img_url}
                                   onChange={handleFile}
                        />


                    </div>
                    <div>
                        {
                            (
                                <div className="w-full flex flex-col justify-center ">
                                    <h1 className="text-center">Podgląd/preview</h1>
                                    <img className=" w-[150px] h-[150px] object-contain"
                                         src={undefinedImages(mainPhoto?.files[0]?.url, '', undefinedUrl)}
                                         width="150" height="150" alt={'xD'}/>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div>
                    <Button
                        type="button"
                        onClick={() => sendUserPoints([PointsMountainSectionENUM.ENTRY])}
                        children={'punkty za wejscie'}
                        background="bg-blue-500"
                        textColor={"text-white"}
                        hoverColor={"bg-red-400"}
                    />
                    <Button
                        type="button"
                        onClick={() => sendUserPoints([PointsMountainSectionENUM.DESCENT])}
                        children={'punkty za zejscie'}
                        background="bg-blue-500"
                        textColor={"text-white"}
                        hoverColor={"bg-red-400"}
                    />
                    <Button
                        type="button"
                        onClick={() => sendUserPoints([PointsMountainSectionENUM.ENTRY, PointsMountainSectionENUM.DESCENT])}
                        children={'wejscie i zejscie'}
                        background="bg-blue-500"
                        textColor={"text-white"}
                        hoverColor={"bg-red-400"}
                    />
                </div>
            </Fieldset>


        </div>
    );
}

