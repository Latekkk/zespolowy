import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Point from './Partials/Point';
import GoogleMapComponent from "@/Components/GoogleMapComponent";
export default function Index(  props: any) {

    const { t } = useTranslation(['advertisement'])
    console.log(props)
    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title="" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                            {props.points && props.points.data?.map((point, index) => {
                               return <Point
                                    key={'point' + index}
                                    name={point.name}
                                    slug={point.slug}
                                    auth={props.auth.user !== null}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
