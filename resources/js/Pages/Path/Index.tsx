import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Pagination from "@/Components/Pagination";
import Path from './Partials/Path';
export default function Index(  props: any) {

    const { t } = useTranslation(['nazwa_pliku_z_tłumaczeniami'])
    function handleChange(e: any) {
        const value = e.target;
    }

    function handleClick(path){
        //przejscie do mapy
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title="Aktualności" />
            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/*<input placeholder="Enter name search" onChange={event =>  window.location.href='/path'} id="name"/>*/}
                        <div className="p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                            {console.log(props.paths)}
                            {props?.data?.map((path, index) => {

                                return <Path
                                    key={'path' + index}
                                    name={path.name}
                                    entry_points={path.entry_points}
                                    points_for_descent={path.points_for_descent}
                                    distance = {path.distance}
                                    slug={path.slug}
                                    auth={props.auth.user !== null}
                                />
                            })}
                        </div>
                        <Pagination props={props.path}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
