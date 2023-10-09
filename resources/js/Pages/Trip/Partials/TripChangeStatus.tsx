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


export default function TripChangeStatus({section, trip, user, guides, collapsed}) {
    const globalTranslation = useTranslation(["global"]);

    const [date, setDate] = useState<string | Date | Date[] | null>(null);
    let today = new Date();
    const [selectedGuide, setSelectedGuide] = useState<User | null>(null);
    const [img_url, setImg_url] = useState(null)

    const undefinedUrl = 'http://' + window.location.host + '/images/undefined/404.webp';
    const mainPhoto = useFileList();

    function sendUserPoints(points_mountain_section = null, selectedDate = null, guide = null, img_url = null) {
        Inertia.post(route('userPoints.store', {
            trip_id: trip.id,
            user_id: user.id,
            mountain_section_id: section.id,
            points_mountain_section: points_mountain_section,
            date: selectedDate,
            guide: guide?.id,
            img_url: img_url,
            status: StatusENUM.PENDING,
        }));
    }

    const handleFile = (e) => {
        if (e.currentTarget.files) {
            setImg_url(e.currentTarget.files[0]);
            mainPhoto.addFile(e.target.files)
        }
    };

    return (
        <div key={'tripChangeStatus-' + section.id}
             className='flex flex-row border-1 border border-gray-400 shadow-xl mx-2 p-2 text-left items-center w-[1000px] mb-6'>
            <Fieldset legend={section.name} className={'w-full flex flex-row'} toggleable collapsed={collapsed}>
                <div className={'flex flex-row gap-x-2'}>
                    <div className={'flex flex-col w-full gap-y-2'}>
                        <div className={'flex flex-col gap-y-2'}>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} maxDate={today} showIcon
                                      className={'bg-blue-500'}/>
                            <Dropdown value={selectedGuide}
                                      onChange={(e: DropdownChangeEvent) => setSelectedGuide(e.value)} options={guides}
                                      optionLabel="name"
                                      editable placeholder="wybierz przodownika" className="w-full md:w-14rem"/>
                        </div>
                    </div>
                    <div className={'w-[250px] max-w-[250px] px-2'}>
                        <FileInput labelText={'zdj'}
                                   name='img_url'
                                   value={img_url ?? undefined}
                                   onChange={handleFile}
                                   showName={false}
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
                        onClick={() => sendUserPoints([PointsMountainSectionENUM.ENTRY], date, selectedGuide)}
                        children={'punkty za wejscie'}
                        background="bg-blue-500"
                        textColor={"text-white"}
                        hoverColor={"bg-red-400"}
                    />
                    <Button
                        type="button"
                        onClick={() => sendUserPoints([PointsMountainSectionENUM.DESCENT], date, selectedGuide)}
                        children={'punkty za zejscie'}
                        background="bg-blue-500"
                        textColor={"text-white"}
                        hoverColor={"bg-red-400"}
                    />
                    <Button
                        type="button"
                        onClick={() => sendUserPoints([PointsMountainSectionENUM.ENTRY, PointsMountainSectionENUM.DESCENT], date, selectedGuide)}
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

