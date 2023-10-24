import Layout from '@/Layouts/Layout';
import { useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import GoogleMapComponent from "@/Components/GoogleMapComponent";
import Input from "@/Components/Input"
import Button from "@/Components/Button";
import DropdownWithErrorMessage from "@/Components/DropdownWithErrorMessage";
import React, {useEffect, useRef, useState} from "react";
import Chip from '@/Components/Chip';
import deleteById from '@/Functions/deleteById';
import {Toast} from 'primereact/toast';
import isObjectInArray from "@/Functions/isObjectInArray";

export default function Form(props) {

    const toast = useRef(null);
    const {t} = useTranslation(['points'])
    const globalTranslation = useTranslation(['global'])
    const point = props.point ?? null;

    const [mountainMainParts, setMountainMainParts] = useState( props?.point?.mountain_main_parts || [])
    const {data, setData, post, put, processing, errors, reset, cancel, clearErrors} = useForm({
        markers: props?.point === undefined ? [] : [{
            'lat': Number(props?.point?.lat),
            'lng': Number(props?.point?.lng)
        }],
        name: props?.point?.name || '',
        mountain_main_part_id: point?.mountain_main_part_id || null,
        remember: true,
    })

    function handleChange(e, keyName, val) {
        const key = e?.target?.id || keyName;
        let value = e?.target?.value || val || e || '';
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        point === null ? post(route('point.store')) : put(route('point.update', point.id))
    }

    const setDefaultForm = () => {
        reset();
        clearErrors()
    }

    const getName = () => {
        if (props.mountainMainParts === undefined) return '';
        return props?.mountainMainParts.find(item => item?.id === data?.mountain_main_part_id)
    }

    const addMountainRanges = (object) => {
        if (!isObjectInArray(mountainMainParts, object)) {
            setMountainMainParts([...mountainMainParts, object])
        } else {
            toast.current.show({
                severity: 'error',
                summary: 'Błąd przy dodawaniu',
                detail: 'istnieje: ' + object.name,
                life: 3000
            });
        }
    }

    useEffect(() => {
        setData(data => ({
            ...data,
            ['mountainMainParts']: mountainMainParts,
        }))
    }, [mountainMainParts])



        return (
        <Layout
            props={props}
            header={<h2
            className="font-semibold text-xl text-gray-800 leading-tight">{t('creating.editing.a.point')}</h2>}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex flex-row p-2 text-gray-900 gap-x-4">
                                <div className="flex flex-col gap-y-4">
                                    <GoogleMapComponent markers={data.markers} setMarkers={handleChange} lastPoint={props.lastPoint}/>

                                </div>
                                <div className="flex flex-col gap-y-6 w-full pt-4">
                                    <div className="flex flex-col gap-6 w-full">
                                        <Input labelText={t('point.name')}
                                               name='name'
                                               value={data.name}
                                               error={errors.name}
                                               onChange={handleChange}
                                               placeholder={t('enter.the.point.name')}
                                        />
                                        <div className="flex flex-row gap-x-4 w-full">
                                            <Input labelText={t('latitude')}
                                                   name={'geoLat'}
                                                   placeholder={t('enter.latitude')}
                                                   value={data.markers[0]?.lat ?? ''}
                                                   error={errors.geoLat || errors.markers}
                                                   readOnly={true}
                                            />
                                            <Input labelText={t('longitude')}
                                                   name={'geoLng'}
                                                   placeholder={t('enter.longitude')}
                                                   value={data.markers[0]?.lng ?? ''}
                                                   error={errors.geoLng || errors.markers}
                                                   readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <DropdownWithErrorMessage label={t('mountain.range')}
                                                              value={getName()}
                                                              valueTemplate={getName() }
                                                              onChange={(e) => handleChange(e.id, 'mountain_main_part_id', e.id)}
                                                              options={props.mountainMainParts}
                                                              optionLabel="name"
                                                              placeholder={t('choose.mountain.range')}
                                                              className="w-full md:w-14rem"
                                                              error={errors.mountainMainParts} name={'mountainRangesDropDown'}
                                    />
                                </div>

                            </div>
                            <div className='flex flex-row gap-x-2 p-2 w-full justify-end'>

                                <Button type='button' children={globalTranslation.t('cancel')} onClick={cancel}/>
                                <Button type='button' onClick={setDefaultForm} disabled={processing}
                                        children={globalTranslation.t('reset')} background="bg-red-500"
                                        textColor={"text-white"} hoverColor={"bg-red-400"}/>

                                <Button type='submit' disabled={processing} children={globalTranslation.t('submit')}
                                        background="bg-blue-500" textColor={"text-white"}
                                        hoverColor={"bg-blue-400"}/>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toast ref={toast}></Toast>
        </Layout>
    );
}
