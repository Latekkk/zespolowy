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
import {Dialog} from "primereact/dialog";
import PointService from "@/Pages/Point/service/PointService";
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
        {field: 'name', header: 'Name'},
        {field: 'entry_points', header: 'entry'},
        {field: 'points_for_descent', header: 'descent'},
        {field: 'distance', header: 'distance'}
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
    function pathMap(e: any){
        //wyświetlenie mapy
    }
    const showModal = (data) => {
        setVisible(true)
        setModalData(data)
    }
    const removeElement = (data) => {
        PathService.removePath(data.id).then((e) => {
                getPaths()
                setVisible(false)
                toastShow('Usunięto', 'error', data.name)
            }
        );
    }
    const toastShow = (summary, severity, content) => {
        toast.current?.show({severity: severity, summary: summary, detail: content});
    };
    const actionTemplate = (rowData, column) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" className="bg-white-700 hover:bg-red-500 focus:bg-pink-500" icon="pi pi-delete-left"
                        onClick={() => pathMap(rowData)} ></Button>
                <Link className="bg-blue-700 px-2 hover:bg-blue-500" href={route('path.edit', {id: rowData.id})} method="get" as="button" type="button">
                    <i className="pi pi-file-edit text-white" style={{ fontSize: '1.5rem' }}>
                    </i>
                </Link>
                <Button type="button" className="bg-red-700 hover:bg-red-500 focus:bg-red-500" icon="pi pi-delete-left"
                        onClick={() => showModal(rowData)} rounded></Button>
            </div>
        );

    };


    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title="Aktualności" />
            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
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
            </div>{
            modalData &&

                <Dialog header={`Czy chcesz usunąć : "${modalData.name}"`} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <p className="m-0">
                        {t('entry_points')}: {modalData.entry_points}
                        {t('points_for_descent')}: {modalData.points_for_descent}
                        {t('distance')}: {modalData.distance}
                    </p>
                    <div className="flex flex-row gap-x-2 justify-end">
                        <Button label="Usuń" className={"bg-red-600 hover:bg-red-500"}
                                onClick={() => removeElement(modalData)}/>
                        <Button label="Anuluj" className={"bg-blue-600 hover:bg-red-500"}
                                onClick={() => setVisible(false)}/>
                    </div>
                </Dialog>
            }
                <Toast ref={toast}/>
        </Layout>
    );
}
