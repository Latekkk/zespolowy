import Layout from '@/Layouts/Layout';
import {Head, Link} from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Pagination from "@/Components/Pagination";
import Path from "@/Pages/Path/Partials/Path";
import {Column} from 'primereact/column';
import React, {useEffect, useRef, useState} from "react";
import PathService from "@/Pages/Path/service/PathService";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Paginator} from "primereact/paginator";
import {Button} from "primereact/button";
interface Path {
    name: string;
    entry_points: string;
    points_for_descent: string;
    distance: string;
}
interface ColumnMeta {
    field: string;
    header: string;
}
export default function Index(  props: any) {
    const {t} = useTranslation(['paths'])
    const globalTranslation = useTranslation(['global'])
    const [paths, setPaths] = useState<Path[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(15);
    const [totalRecords, setTotalRecords] = useState(0)
    const [first, setFirst] = useState(0);
    const [sort, setSort] = useState<string>('id')
    const [sortOrder, setSortOrder] = useState<string>('1')

    const [visible, setVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<Path>();
    const toast = useRef<Toast>(null);

    function handleChange(e: any) {
        const value = e.target;
    }

    function handleClick(path){
        //przejscie do mapy
    }
    const columns: ColumnMeta[] = [
        {field: 'id', header: '#'},
        {field: 'name', header: t('path.name')},
        {field: 'entry_points', header: t('entrance.points')},
        {field: 'points_for_descent', header: t('points.for.descent')},
        {field: 'distance', header: t('distance')}
    ];
    useEffect(() => {

        getPaths()
    }, []);

    useEffect(() => {
        getPaths()
    }, [page, paginate, sort, sortOrder]);

    const getPaths = () => {
        PathService.getPaths(paginate, page, sort, sortOrder).then((data: Path[]) => {
            setPaths(data.data);
            setLoading(false);
            setTotalRecords(data.total)
        });
    }
    const onPageChange = (event) => {
        console.log(event)
        setFirst(event.first);
        setPage(event.page + 1);
        setPaginate(event.rows);
    };
    const actionTemplate = (rowData, column) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link className="bg-blue-700 px-2 hover:bg-blue-500" href={route('path.edit', {id: rowData.id})} method="get" as="button" type="button">
                    <i className="pi pi-file-edit text-white" style={{ fontSize: '1.5rem' }}>
                    </i>
                </Link>

                <Button type="button" className="bg-red-700 hover:bg-red-500 focus:bg-red-500" icon="pi pi-delete-left"
                        onClick={() => showModal(rowData)} rounded></Button>
            </div>
        );

    };
    const showModal = (data) => {
        setVisible(true)
        setModalData(data)
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('my.paths')}</h2>}
        >
            <Head title={t('name')} />
            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/*<input placeholder="Enter name search" onChange={event =>  window.location.href='/path'} id="name"/>*/}
                        <div className="p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                            {/*{console.log(props.path)}*/}
                            {/*{props?.data?.map((path, index) => {*/}

                            {/*    return <Path*/}
                            {/*        key={'path' + index}*/}
                            {/*        name={path.name}*/}
                            {/*        entry_points={path.entry_points}*/}
                            {/*        points_for_descent={path.points_for_descent}*/}
                            {/*        distance = {path.distance}*/}
                            {/*        slug={path.slug}*/}
                            {/*        auth={props.auth.user !== null}*/}
                            {/*    />*/}
                            {/*})}*/}
                            <DataTable
                                value={paths}
                                sortField={sort}
                                sortOrder={sortOrder}
                                onSort={event => {
                                    setSort(event.sortField);
                                    setSortOrder(event.sortOrder)
                                }}
                                removableSort
                                tableStyle={{width: "max-content"}} loading={loading}
                            >
                                {columns.map((col, i) => (
                                    <Column key={col.field} field={col.field} header={col.header} sortable/>
                                ))}

                                <Column body={actionTemplate} headerClassName="w-10rem" expander/>
                            </DataTable>
                        </div>
                        <Paginator first={first} rows={paginate} totalRecords={totalRecords}
                                   rowsPerPageOptions={[5, 15, 20, 30]} pageLinkSize={7}
                                   onPageChange={onPageChange}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
