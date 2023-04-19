import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import Button from "@/Components/Button";
import React, {useEffect, useState} from "react";
import Input from "@/Components/Input";
import DropdownWithErrorMessage from "@/Components/DropdownWithErrorMessage";

export default function Form(props) {
    const {t} = useTranslation(['mountains_Section'])
    const mountainsSectionTranslation = useTranslation(['mountainsSection']);
    const globalTranslation = useTranslation(['global'])

    const [firstName, setFirstName] = useState(null )
    const [secondName, setSecondName] = useState(null)
    const mountainsSection = props.mountainsSection ?? null;

    const {data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: mountainsSection?.name || "",
        entry_points: mountainsSection?.entry_points || "",
        points_for_descent: mountainsSection?.points_for_descent || "",
        start_point : mountainsSection?.start_point || "",
        end_point : mountainsSection?.end_point || "",
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
        mountainsSection === null ?post(route('mountainsSection.store',data)): put(route('mountainsSection.update', mountainsSection.id))

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
        if(mountainsSection != null){
            setFirstName(findPoint(mountainsSection.start_point));
            setSecondName(findPoint(mountainsSection.end_point));
        }
    },[])

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight" >{t('mountains_Section')}</h2>}
        >
            <Head title={t('mountains_Section')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">

                                <p> name: {firstName?.name} {secondName?.name}</p>
                                <DropdownWithErrorMessage value={t('firstName')}
                                                          onChange={(e) => setFirstName(e.value)}
                                                          options={props.points}
                                                          optionLabel="name"
                                                          placeholder={t('select_start_point')}
                                                          className="w-full md:w-14rem"
                                                          error={errors}
                                />
                                <DropdownWithErrorMessage value={t('secondName')}
                                                          onChange={(e) => setSecondName(e.value)}
                                                          options={props.points}
                                                          optionLabel="name"
                                                          placeholder={t('select_end_point')}
                                                          className="w-full md:w-14rem"
                                                          error={errors}
                                />
                                <Input labelText={t('entry_points')}
                                       name='entry_points'
                                       value={data.entry_points}
                                       error={errors.entry_points}
                                       onChange={handleChange}
                                       placeholder={t('entry_points')}
                                       type='number'
                                />
                                <Input labelText={t('points_for_descent')}
                                       name='points_for_descent'
                                       value={data.points_for_descent}
                                       error={errors.points_for_descent}
                                       onChange={handleChange}
                                       placeholder={t('points_for_descent')}
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
