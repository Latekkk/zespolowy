import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import Button from "@/Components/Button";
import React, {useEffect, useState} from "react";
import Input from "@/Components/Input";
import DropdownWithErrorMessage from "@/Components/DropdownWithErrorMessage";
import PointService from "@/Pages/Point/service/PointService";
import {Point} from "@/Models/Point";
import Errors from "@/Components/Errors";

export default function Form(props) {
    const {t} = useTranslation(['mountainsSection'])
    //const mountainsSectionTranslation = useTranslation(['mountainssection']);
    const globalTranslation = useTranslation(['global'])

    const [firstName, setFirstName] = useState(null )
    const [secondName, setSecondName] = useState(null)
    const mountainSection = props.mountainSection ?? null;
    const [points, setPoints] = useState<Point[]>([]);


    const {data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: mountainSection?.name || "",
        entry_points: mountainSection?.entry_points || "",
        points_for_descent: mountainSection?.points_for_descent || "",
        start_point : mountainSection?.start_point || "",
        end_point : mountainSection?.end_point || "",
        mountain_main_part_id: mountainSection?.mountain_main_part_id || null,
        remember: true
    })


    function findPoint(id){
        const result = props.points.find(point =>point.id === id);
        return result || null;
    }

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
        mountainSection === null ? post(route('mountainSection.store', data)): put(route('mountainSection.update', mountainSection.id))

    }

    const setDefaultForm = () => {
        reset();
        clearErrors()
    }


    useEffect(() => {
        if  (firstName !== null) {
            setData(data => ({
                ...data,
                ["start_point"]: firstName?.id,
            }))
        }
        if  (secondName !== null) {
            setData(data => ({
                ...data,
                ["end_point"]: secondName?.id,
            }))
        }

        setData(data => ({
            ...data,
            ["name"]: firstName?.name + " - " + secondName?.name,
        }))
    }, [firstName, secondName])

    useEffect(()=>{
        if(mountainSection != null){
            setFirstName(findPoint(mountainSection.start_point));
            setSecondName(findPoint(mountainSection.end_point));
        }
        getPoints()
    },[])
    useEffect(() => {
        getPoints()
    }, [data.mountain_main_part_id]);

    useEffect(() => {
    }, [points]);
    const getPoints = () => {
        PointService.getPoints(data.mountain_main_part_id?.id).then((data: Point[]) => {
            setPoints(data.data);
        });
    }

    const getName = () => {
        return props.mountainMainParts.find(item => item?.id === data?.mountain_main_part_id)
    }


    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight" >{t('creating.editing.a.mountain.section')}</h2>}
        >
            <Head title={t('creating.editing.a.mountain.section')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/*<Errors errors={props.errors}></Errors>*/}

                    <form onSubmit={handleSubmit}>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                                <DropdownWithErrorMessage label={t('mountain.range')}
                                                          value={getName()}
                                                          valueTemplate={getName() }
                                                          onChange={(e) => handleChange(e.id, 'mountain_main_part_id', e.id)}
                                                          options={props.mountainMainParts}
                                                          optionLabel="name"
                                                          placeholder={t('select.a.mountain.range')}
                                                          className="w-full md:w-14rem"
                                />
                                <p> {t('mountain.section.name')}: {firstName?.name}  ,  {secondName?.name}</p>
                                <DropdownWithErrorMessage label={t('starting.point')}
                                                          value={firstName?.name }
                                                          valueTemplate={firstName?.name }
                                                          onChange={(e) => {setFirstName(e)}}
                                                          options={points}
                                                          optionLabel="name"
                                                          placeholder={t('select.a.starting.point')}
                                                          className="w-full md:w-14rem"
                                                          error={errors.start_point}
                                />
                                <DropdownWithErrorMessage label={t('endpoint')}
                                                          valueTemplate={secondName?.name }
                                                          onChange={(e) => setSecondName(e)}
                                                          options={points}
                                                          optionLabel="name"
                                                          placeholder={t('select.an.endpoint')}
                                                          className="w-full md:w-14rem"
                                                          error={errors.end_point}
                                />
                                <Input labelText={t('entrance.points')}
                                       name='entry_points'
                                       value={data.entry_points}
                                       error={errors.entry_points}
                                       onChange={handleChange}
                                       placeholder={t('entrance.points.ph')}
                                       type='number'
                                />
                                <Input labelText={t('points.for.descent')}
                                       name='points_for_descent'
                                       value={data.points_for_descent}
                                       error={errors.points_for_descent}
                                       onChange={handleChange}
                                       placeholder={t('points.for.descent.ph')}
                                       type='number'
                                />
                                <div className='flex flex-row gap-x-2 w-full justify-end mt-4'>
                                    <Button type='button' onClick={setDefaultForm} disabled={processing} children={globalTranslation.t('reset')} background="bg-red-500" textColor={"text-white"} hoverColor={"bg-red-400"}/>
                                    <Button type='submit' disabled={processing} children={globalTranslation.t('submit')} background="bg-blue-500" textColor={"text-white"} hoverColor={"bg-blue-400"}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
