import Input from '@/Components/Input';
import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Form(props) {

    const point = props.point ?? null;

    const { t } = useTranslation(['point'])

    const {data, setData, post, put, processing, errors} = useForm({
        title: point?.name || "",
        description: point?.description ?? "",
        remember: true,
    })


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
        point === null? post(route('point.store')): put(route('point.update', point.slug))
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('new.announcement')}</h2>}
        >
            <Head title="Dodawanie/Edytowanie punktu"/> // zmienic później na podstawie czy point jest np. dodanie EditMode

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <Input labelText={t(data.name)} name={'name'} value={data.name} onChange={handleChange} error={errors.name}/>

                                {errors.description && <div>{errors.description}</div>}
                                <button type="submit" disabled={processing}>{t('submit')}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
