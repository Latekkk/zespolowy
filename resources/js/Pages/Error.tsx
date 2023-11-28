import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useTranslation} from "react-i18next";
import Layout from "@/Layouts/Layout";
import Heading1 from "@/Components/Heading1";
import Heading3 from "@/Components/Heading3";

export default function Dashboard({status}) {
    const {t} = useTranslation(['error'])

    return (
        <Layout
            header={''}
        >
            <div className="py-12 px-12  h-[90vh]">
                <div className={`flex items-center justify-center w-full h-full  bg-[url('/images/errorGif.gif')] bg-repeat-x bg-cover bg-origin-padding bg-clip-content rounded rounded-xl`}>

                    <div className="flex flex-col p-4 rounded rounded-xl shadow shadow-xl border border-gray-300 pb-12 px-20 bg-gray-200 opacity-75 ">
                        <Heading1 extraClass={'text-gray-800  opacity-100'} >{t('title.' + status)}</Heading1>
                        <Heading3>{t('description.' + status)}</Heading3>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
