import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import Input from "@/Components/Input"
import Button from "@/Components/Button";
import FileInput from '@/Components/FileInput';



export default function Form(props) {

    const badge = useTranslation(['contact'])
    const global = useTranslation(['global'])
    const {data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        img_url: [],
        point: '',
        remember: true,
    })

    const handleFile = (e) => {
        if (e.currentTarget.files) {
            setData("img_url", e.currentTarget.files[0]);
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
        post(route('badge.store', data))
    }

    const setDefaultForm = () => {
        reset();
        clearErrors()
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{badge.t('name')}</h2>}
        >
            <Head title=""/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">

                                <div className="flex flex-col gap-2 w-full">

                                    <div className="w-full basis-1/2">
                                        <Input labelText={badge.t('name')}
                                               name='name'
                                               value={data.name}
                                               error={errors.name}
                                               onChange={handleChange}
                                               placeholder='Wprowadz nazwe odznaki'
                                        />

                                        <Input labelText={badge.t('point')}
                                               name='point'
                                               value={data.point}
                                               error={errors.point}
                                               onChange={handleChange}
                                               type={"number"}
                                               placeholder='Wprowadz ilosc punktów...'
                                        />

                                        <FileInput labelText={badge.t('img_url')}
                                               name='img_url'
                                               value={data.img_url}
                                               error={errors.img_url}
                                               onChange={handleFile}
                                        />
                                    </div>


                                </div>
                                <div className='flex flex-row gap-x-2 w-full justify-end mt-4'>
                                    <Button type='button' onClick={setDefaultForm} disabled={processing} children={'reset'} background="bg-red-500" textColor={"text-white"} hoverColor={"bg-red-400"}/>
                                    <Button type='submit' disabled={processing} children={'submit'} background="bg-blue-500" textColor={"text-white"} hoverColor={"bg-blue-400"}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
