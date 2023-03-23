import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import GoogleMapComponent from "@/Components/GoogleMapComponent";
import Input from "@/Components/Input"
import Button from "@/Components/Button";

export default function Form(props) {

    const {t} = useTranslation(['points'])
    const {data, setData, post, put, processing, errors, reset, cancel, clearErrors } = useForm({
        markers: props?.point === undefined? [] : [ {'lat': Number(props?.point?.lat), 'lng': Number( props?.point?.lng)}],
        name: props?.point?.name || '',
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
        post(route('point.store', data))
    }

    const setDefaultForm = () => {
        reset();
        clearErrors()
        console.log(data);
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title=""/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                                <GoogleMapComponent markers={data.markers} setMarkers={handleChange}/>

                                <div className="flex flex-col gap-2 w-max">
                                    <Input labelText={t('name')}
                                           name='name'
                                           value={data.name}
                                           error={errors.name}
                                           onChange={handleChange}
                                    />
                                    <Input labelText={t('szerokosc_geograficzna')}
                                           name={'geoLat'}
                                           value={data.markers[0]?.lat ?? ''}
                                           error={errors.geoLat || errors.markers}
                                           readOnly={true}
                                    />
                                    <Input labelText={t('długosc_geograficzna')}
                                           name={'geoLng'}
                                           value={data.markers[0]?.lng ?? ''}
                                           error={errors.geoLng || errors.markers}
                                           readOnly={true}
                                    />

                                </div>
                                <div className={'flex flex-row gap-x-2'}>
                                    <Button type='submit' disabled={processing} children={'submit'} background="bg-blue-500" textColor={"text-white"} hoverColor={"bg-blue-400"}/>
                                    <Button type='button' onClick={setDefaultForm} disabled={processing} children={'reset'} background="bg-red-500" textColor={"text-white"} hoverColor={"bg-red-400"}/>

                                    <Button type='button' children={'cancel'} onClick={cancel}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
