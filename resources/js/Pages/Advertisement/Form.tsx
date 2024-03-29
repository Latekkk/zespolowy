import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button} from "primereact/button";
import Input from "@/Components/Input";

import { DateTime } from "luxon";
import {Simulate} from "react-dom/test-utils";
import invalid = Simulate.invalid;
export default function Form(props) {

    const advertisement = props.advertisement ?? null;

    const {t} = useTranslation(['advertisement'])

    const {data, setData, post, put, processing, errors} = useForm({
        title: advertisement?.title || "",
        description: advertisement?.description ?? "",
        time_to: advertisement?.time_to || "",
        time_from: advertisement?.time_from || "",
        remember: true,
    })


    const modules = {
        toolbar: [
            [{font: []}],
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            ["bold", "italic", "underline", "strike"],
            [{color: []}, {background: []}],
            [{script: "sub"}, {script: "super"}],
            ["blockquote", "code-block"],
            [{indent: "-1"}, {indent: "+1"}, {align: []}],
            ["link"],
            ["clean"],
        ],

    };

    function handleChange(e, keyName) {
        const key = e?.target?.id || keyName;
        const value = e?.target?.value || e;
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        advertisement === null ? post(route('advertisement.store')) : put(route('advertisement.update', advertisement.slug))
    }

    const getInputDate = (date) => {
        let d = new Date(date);

        if (isDateValid(d)) {
            d =  DateTime.fromISO(d.toISOString())
            const year = d.year;
            const month = d.month;
            const day = d.day;

            return(`${year}-${(month <= 9? '0': '')+month}-${(day <= 9? '0': '')+ day}`);
        }
    }

    const isDateValid = (dateString) =>  {
        const d = new Date(dateString);
        return !(d instanceof Date && isNaN(d));
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('creating.editing.an.announcement')}</h2>}
        >
            <Head title={t('creating.editing.an.announcement')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col p-6 text-gray-900 gap-4">
                            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                <div className="flex flex-row gap-x-8 items-center">
                                    <Input labelText={t('title')} name={'title'} value={data.title ?? ''}
                                           onChange={handleChange} error={errors.title} placeholder={t('enter.title')} extraClass="h-[125px]"/>
                                    <Input labelText={t('time_from')} name={'time_from'} value={getInputDate(data.time_from) ?? ''}
                                               onChange={handleChange} error={errors.time_from} type='date' extraClass="h-[125px]"/>
                                    <Input labelText={t('time_to')} name={'time_to'} value={getInputDate(data.time_to) ?? ''}
                                               onChange={handleChange} error={errors.time_to} type='date' extraClass="h-[125px]"/>

                                </div>
                                <ReactQuill theme="snow" modules={modules} value={data.description} className=" h-[300px] py-4 pb-[50px]"
                                            onChange={((e) => handleChange(e, 'description'))}/>
                                {errors.description && <div className={'text-red-500'}>{errors.description} </div>}

                                <div className="flex flex-row w-full justify-end">
                                    <Button label={t('submit')} type={'submit'} disabled={processing}
                                            className={'bg-blue-700 mt-4 w-[200px] rounded-md'}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
