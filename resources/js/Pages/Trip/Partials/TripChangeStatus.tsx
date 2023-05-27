import Button from "@/Components/Button";
import React from "react";
import {useTranslation} from "react-i18next";
import {Inertia} from "@inertiajs/inertia";
import PointsMountainSectionEnum from "@/Enums/PointsMountainSectionEnum ";

export default function TripChangeStatus({section, trip, user, mountainPointSection}) {




    const globalTranslation = useTranslation(["global"]);
    return (
        <div key={section.id} className='flex flex-row border-1 border border-gray-400 shadow-xl mx-2 p-1 text-left items-center w-[1000px] mb-6'>
            <span className='w-[520px]'>{section.name}</span>
            <Button
                type="button"
                onClick={() => Inertia.post(route('userPoints.store', { trip_id: trip.id, user_id: user.id, points_mountain_section: [PointsMountainSectionEnum.ENTRY] }))}
                children={'punkty za wejscie'}
                background="bg-blue-500"
                textColor={"text-white"}
                hoverColor={"bg-red-400"}
            />
            <Button
                type="button"
                onClick={() => (section)}
                children={'punkty za zejscie'}
                background="bg-blue-500"
                textColor={"text-white"}
                hoverColor={"bg-red-400"}
            />
            <Button
                type="button"
                onClick={() => (section)}
                children={'wejscie i zejscie'}
                background="bg-blue-500"
                textColor={"text-white"}
                hoverColor={"bg-red-400"}
            />
        </div>
    );
}

