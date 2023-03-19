import React, {useState, useEffect, useRef} from 'react';
import {Inertia} from '@inertiajs/inertia'

import Layout from '@/Layouts/Layout';
import {Head, Link} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';

import {Column} from 'primereact/column';

import PointService from "@/Pages/Point/service/PointService";
import {DataTable} from 'primereact/datatable';
import {Paginator} from 'primereact/paginator';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import Point from "@/Pages/Point/Partials/Point";
import {Toast} from 'primereact/toast';
interface Point {
    name: string;
    lat: string;
    lng: string;
}

interface ColumnMeta {
    field: string;
    header: string;
}

export default function Index(props: any) {
    const {t} = useTranslation(['points'])
    const [points, setPoints] = useState<Point[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(15);
    const [totalRecords, setTotalRecords] = useState(0)
    const [first, setFirst] = useState(0);
    const [sort, setSort] = useState<string>('id')
    const [sortOrder, setSortOrder] = useState<string>('1')

    const [visible, setVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<Point>();
    const toast = useRef<Toast>(null);

    const columns: ColumnMeta[] = [
        {field: 'id', header: '#'},
        {field: 'name', header: 'Name'},
        {field: 'lat', header: 'Lat'},
        {field: 'lng', header: 'Len'}
    ];

    const toastShow = (summary, severity, content) => {
        toast.current?.show({severity: severity, summary: summary, detail: content});
    };

    const onPageChange = (event) => {
        console.log(event)
        setFirst(event.first);
        setPage(event.page + 1);
        setPaginate(event.rows);
    };

    useEffect(() => {
        getPoints()
    }, []);

    useEffect(() => {
        getPoints()
    }, [page, paginate, sort, sortOrder]);

    const getPoints = () => {
        PointService.getPoints(paginate, page, sort, sortOrder).then((data: Point[]) => {
            setPoints(data.data);
            setLoading(false);
            setTotalRecords(data.total)
        });
    }

    const visit = (id) => {
        Inertia.visit(route('point.edit', {id: id}))
    }

    const showModal = (data) => {
        setVisible(true)
        setModalData(data)
    }


    const actionTemplate = (rowData, column) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link className="bg-blue-700 px-2 hover:bg-blue-500" href={route('point.edit', {id: rowData.id})} method="get" as="button" type="button">
                    <i className="pi pi-file-edit text-white" style={{ fontSize: '1.5rem' }}>
                    </i>
                </Link>

                <Button type="button" className="bg-red-700 hover:bg-red-500 focus:bg-red-500" icon="pi pi-delete-left"
                        onClick={() => showModal(rowData)} rounded></Button>
            </div>
        );

    };

    const removeElement = (data) => {
        PointService.removePoint(data.id).then((e) => {
                getPoints()
                setVisible(false)
                toastShow('Usunięto', 'error', data.name)
            }
        );
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title={t('name')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="card w-full p-fluid">
                            <DataTable
                                value={points}
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
                            <Paginator first={first} rows={paginate} totalRecords={totalRecords}
                                       rowsPerPageOptions={[5, 15, 20, 30]} pageLinkSize={7}
                                       onPageChange={onPageChange}/>
                        </div>
                    </div>
                </div>
            </div>


            {
                modalData &&

                <Dialog header={`Czy chcesz usunąć : "${modalData.name}"`} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <p className="m-0">
                        Szerokość : {modalData.lat}
                        Długość {modalData.lng}
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
