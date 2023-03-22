import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import GoogleMapComponent from "@/Components/GoogleMapComponent";
import Input from "@/Components/Input"
import Button from "@/Components/Button";
import TextArea from '@/Components/TextArea';
import { GrPhone } from 'react-icons/gr';
import { AiOutlineMail } from "react-icons/ai";


export interface Contact {
    id: number;
    name: string;
    title: string;
    email: string;
    phone_number: string;
    description: string;
    response: boolean;
}

export default function Form(props) {

    const contactTranslation = useTranslation(['contact'])
    const {data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        title: '',
        email: '',
        phone_number: '',
        response: '',
        description: '',
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
        post(route('contact.store', data))
    }

    const setDefaultForm = () => {
        reset();
        clearErrors()
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{contactTranslation.t('name')}</h2>}
        >
            <Head title=""/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">

                                <div className="flex flex-row gap-2 w-full">
                                    <div className="flex flex-col w-full basis-1/2 gap-y-8 mt-12">
                                        <p className="text-xl font-bold">Nazwa aplikacji</p>
                                        <p className="text-xl font-bold">Jeśli masz pytania, skorzystaj z poniższych kanałów komunikacji:</p>
                                        <p className="flex flex-row gap-x-2 items-center text-2xl font-bold"><GrPhone/> 123 - 321 123</p>
                                        <p className="flex flex-row gap-x-2 items-center text-2xl font-bold"><AiOutlineMail/> gory@mail.com</p>

                                    </div>
                                    <div className="w-full basis-1/2">
                                        <Input labelText={contactTranslation.t('name')}
                                               name='name'
                                               value={data.name}
                                               error={errors.name}
                                               onChange={handleChange}
                                               placeholder='Wprowadz imie, nazwisko'
                                        />

                                        <Input labelText={contactTranslation.t('email')}
                                               name='email'
                                               value={data.email}
                                               error={errors.email}
                                               onChange={handleChange}
                                               placeholder='Wprowadz email...'
                                        />

                                        <Input labelText={contactTranslation.t('title')}
                                               name='title'
                                               value={data.title}
                                               error={errors.title}
                                               onChange={handleChange}
                                               placeholder='Treść tytuł...'
                                        />

                                        <TextArea labelText={contactTranslation.t('description')}
                                                  name='description'
                                                  value={data.description}
                                                  error={errors.description}
                                                  onChange={handleChange}
                                                  placeholder='Treść tytuł...'
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
