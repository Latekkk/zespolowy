import Layout from '@/Layouts/Layout';
import {Head, router, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import Input from "@/Components/Input"
import Button from "@/Components/Button";
import FileInput from '@/Components/FileInput';
import React, {useEffect} from "react";
import useFileList from '@/Functions/fileList'
import undefinedImages from "@/Functions/undefinedImages";


export default function Form(props) {

    const badgeTranslation  = useTranslation(['badge'])
    const globalTranslation  = useTranslation(['global'])
    const host = window.location.origin + '/storage/photos/'
    const badge = props?.badge ?? null;
    const mainPhoto = useFileList();
    const undefinedUrl = 'http://' + window.location.host + '/images/undefined/404.webp';

    const {data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: badge?.name ||  '',
        point: badge?.point ||  '',
        img_url: badge?.img_url,
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

    function handleSubmit(e) {
        e.preventDefault()
        if(badge === null ) {
            post(route('badge.store'))
        } else {

            router.post(route('badge.update',badge.id),
                {
                    _method: 'put',
                    name: data.name,
                    point: data.point,
                    img_url: data.img_url
                })
            //
            // put(route('badge.update', props.badge.id))
        }
    }

    const setDefaultForm = () => {
        reset();
        mainPhoto.clear();
        clearErrors()
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{badgeTranslation.t('creating.editing.a.badge')}</h2>}
        >
            <Head title={badgeTranslation.t('creating.editing.a.badge')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">

                                <div className="flex flex-col gap-2 w-full">

                                    <div className="w-full basis-1/2">
                                        <Input labelText={badgeTranslation.t('badge.name')}
                                               name='name'
                                               value={data.name}
                                               error={errors.name}
                                               onChange={handleChange}
                                               placeholder={badgeTranslation.t('badge.name.descr')}
                                        />

                                        <Input labelText={badgeTranslation.t('point')}
                                               name='point'
                                               value={data.point}
                                               error={errors.point}
                                               onChange={handleChange}
                                               type={"number"}
                                               placeholder={badgeTranslation.t('point.descr')}
                                        />

                                        <FileInput labelText={badgeTranslation.t('img.url')}
                                               name='img_url'
                                               value={data.img_url}
                                               error={errors.img_url}
                                               onChange={handleFile}
                                        />
                                    </div>

                                    {
                                        (<div className="w-full flex flex-col justify-center gap-y-2 mt-4">
                                            <h1 className="text-center">{badgeTranslation.t('photo.preview')}</h1>
                                            <img class="w-[256px] h-[256px] object-contain" src={undefinedImages(mainPhoto.files.length >= 1? mainPhoto.files[0].url: badge?.photos[0].file_name !== undefined? badge?.photos[0].file_name : '',mainPhoto.files.length >= 1? '' : badge?.photos[0].file_name !== undefined? host :  undefinedUrl)} width="256" height="256"/>
                                        </div>)
                                    }


                                </div>
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
