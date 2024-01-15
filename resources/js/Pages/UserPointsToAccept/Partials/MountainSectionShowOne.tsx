import Button from "@/Components/Button";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PointsMountainSectionENUM from "@/Enums/PointsMountainSectionENUM";
import StatusENUM from "@/Enums/StausEnum";
import FileInput from "@/Components/FileInput";
import undefinedImages from "@/Functions/undefinedImages";
import useFileList from "@/Functions/fileList";
import { useForm, usePage } from "@inertiajs/react";

export default function MountainSectionShowOne({ section, collapsed, duplicate}) {
    const { t } = useTranslation(['trip']);
    const globalTranslation = useTranslation(['global']);
    const pageProps = usePage().props;
    const [date, setDate] = useState<string | Date | Date[] | null>(null);
    let today = new Date();

    const entryAndExitPoints = section.entry_points + section.points_for_descent;

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        mountain_section_id: section.id,
        points_mountain_section: undefined,
        status: StatusENUM.PENDING,
        remember: true,
    });

    const [showModal, setShowModal] = useState(false);


    function handleChange(e, keyName, val) {
        const key = e?.target?.id || keyName;
        let value = e?.target?.value || val || e || '';
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    }

    const setDefaultForm = () => {
        reset();
        clearErrors();
    };

    const sendUserPoints = async (type) => {
        let pointsToAdd = 0;

        if (type.includes(PointsMountainSectionENUM.ENTRY)) {
            pointsToAdd += section.entry_points;
        }

        if (type.includes(PointsMountainSectionENUM.DESCENT)) {
            pointsToAdd += section.points_for_descent;
        }

        setData((data) => ({
            ...data,
            points_mountain_section: type,
        }));
        closeModal();
    };

    useEffect(() => {
        if (data.points_mountain_section !== undefined) {
            post(route('userPoints.store'), {
                onSuccess: (params) => {
                    setData((data) => ({
                        ...data,
                        points_mountain_section: undefined,
                    }));
                },
            });
        }
    }, [data.points_mountain_section]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };



    return (
        <div key={'tripChangeStatus-' + section.id} className='flex flex-row border-1 border border-gray-400 shadow-xl mx-2 p-2 text-left items-center w-[1000px] mb-6'>
            <div className={'flex flex-row gap-x-2'}>
                <div className={'flex flex-col w-full gap-y-2'}>
                    <div className={'flex flex-col gap-y-2'}>
                        <div onClick={openModal} style={{ cursor: 'pointer' }}>
                            {section.name}
                            {duplicate && <p style={{ color: 'red', fontWeight: 'bold' }}>Duplikat</p>}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{t('points.forward')}: {section.entry_points}</p>
                        <p>{t('points.backward')}: {section.points_for_descent}</p>
                        <p>{t('points.both.ways')}: {entryAndExitPoints}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
