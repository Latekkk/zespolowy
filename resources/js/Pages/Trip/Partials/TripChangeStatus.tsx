import Button from "@/Components/Button";
import React from "react";
import {useTranslation} from "react-i18next";
import {Inertia} from "@inertiajs/inertia";
import PointsMountainSectionENUM from "@/Enums/PointsMountainSectionENUM ";
import StatusENUM from "@/Enums/StausEnum";

export default function TripChangeStatus({section, trip, user}) {


    function sendUserPoints(zaCo){
        console.log(section);
        Inertia.post(route('userPoints.store', {
            trip_id: trip.id,
            user_id: user.id,
            mountain_section_id: section.id,
            points_mountain_section: zaCo,
            status: StatusENUM.PENDING,
        }));
    }

    const globalTranslation = useTranslation(["global"]);
    return (
        <div key={section.id} className='flex flex-row border-1 border border-gray-400 shadow-xl mx-2 p-1 text-left items-center w-[1000px] mb-6'>
            <span className='w-[520px]'>{section.name}</span>
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
    );
}

