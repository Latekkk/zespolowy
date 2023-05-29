import Button from "@/Components/Button";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Inertia} from "@inertiajs/inertia";
import PointsMountainSectionENUM from '@/Enums/PointsMountainSectionENUM';
import StatusENUM from "@/Enums/StausEnum";

export default function TripChangeStatus({section, trip, user, userPoints}) {
    const globalTranslation = useTranslation(["global"]);
    const { t } = useTranslation(["trip"]);
    const isEntrySelected = userPoints.some(
        (point) =>
            point.mountain_section_id === section.id &&
            point.points_mountain_section === PointsMountainSectionENUM.ENTRY &&
            point.status === StatusENUM.APPROVED
    );

    const isDescentSelected = userPoints.some(
        (point) =>
            point.mountain_section_id === section.id &&
            point.points_mountain_section === PointsMountainSectionENUM.DESCENT &&
            point.status === StatusENUM.APPROVED
    );

    const isBothSelected = userPoints.some(
        (point) =>
            point.mountain_section_id === section.id &&
            point.points_mountain_section === PointsMountainSectionENUM.BOTH &&
            point.status === StatusENUM.APPROVED
    );

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

    return (
        <div
            key={section.id}
            className="flex flex-row border-1 border border-gray-400 shadow-xl mx-2 p-1 text-left items-center w-[1000px] mb-6"
        >
            <span className="w-[520px]">{section.name}</span>
            <Button
                type="button"
                onClick={() =>
                    sendUserPoints(
                        isEntrySelected ? [] : [PointsMountainSectionENUM.ENTRY]
                    )
                }
                children={t("punkty za wejście")}
                background="bg-blue-500"
                textColor={"text-white"}
                hoverColor={"bg-red-400"}
                disabled={isEntrySelected || isBothSelected}
            />
            <Button
                type="button"
                onClick={() =>
                    sendUserPoints(
                        isDescentSelected ? [] : [PointsMountainSectionENUM.DESCENT]
                    )
                }
                children={t("punkty za zejście")}
                background="bg-blue-500"
                textColor={"text-white"}
                hoverColor={"bg-red-400"}
                disabled={isDescentSelected || isBothSelected}
            />
            <Button
                type="button"
                onClick={() =>
                    sendUserPoints(
                        isEntrySelected && isDescentSelected
                            ? []
                            : [
                                PointsMountainSectionENUM.ENTRY,
                                PointsMountainSectionENUM.DESCENT,
                            ]
                    )
                }
                children={t("wejście i zejście")}
                background="bg-blue-500"
                textColor={"text-white"}
                hoverColor={"bg-red-400"}
                disabled={isBothSelected|| (isEntrySelected && isDescentSelected)}
            />
        </div>
    );
}

