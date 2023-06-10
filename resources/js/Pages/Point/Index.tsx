import React, {useState, useEffect, useRef} from 'react';
import {Inertia} from '@inertiajs/inertia'

import Layout from '@/Layouts/Layout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';

import {Column} from 'primereact/column';

import PointService from "@/Pages/Point/service/PointService";
import {DataTable} from 'primereact/datatable';
import {Paginator} from 'primereact/paginator';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import GoogleMapComponent from "@/Components/GoogleMapComponent";
import {MultiSelect} from "primereact/multiselect";
import {Point} from "@/Models/Point";
interface ColumnMeta {
    field: string;
    header: string;
}

export default function Index(props: any) {
    const {t} = useTranslation(['points'])
    const globalTranslation = useTranslation(['global'])
    const [points, setPoints] = useState<Point[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(15);
    const [totalRecords, setTotalRecords] = useState(0)
    const [first, setFirst] = useState(0);
    const [sort, setSort] = useState<string>('name')
    const [sortOrder, setSortOrder] = useState<string>('1')

    const [visible, setVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<Point>();
    const [selectedMountainMain, setSelectedMountainMain] = useState(null);

    const toast = useRef<Toast>(null);

    const columns: ColumnMeta[] = [
        {field: 'id', header: '#'},
        {field: 'name', header: t('point.name')},
        {field: 'mountainMainPartName', header: t('mountain.range') },
        {field: 'lat', header: t('latitude')},
        {field: 'lng', header: t('longitude')}
    ];

    const toastShow = (summary, severity, content) => {
        toast.current?.show({severity: severity, summary: summary, detail: content});
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setPage(event.page + 1);
        setPaginate(event.rows);
    };

    useEffect(() => {
        getPoints();
    }, []);

    useEffect(() => {
        getPoints();
    }, [page, paginate, sort, sortOrder, selectedMountainMain]);

    const userId = usePage().props?.auth?.user?.id || null;

    const getPoints = () => {
        PointService.getPoints(paginate, page, sort, sortOrder, selectedMountainMain?.map(obj => obj.id)).then((data: Point[]) => {
            const updatedPoints = data.data.map((point: Point) => ({
                ...point,
                mountainMainPartName: getMountainMainPartName(point.mountain_main_part_id) || ''
            }));
            setPoints(updatedPoints);
            setLoading(false);
            setTotalRecords(data.total);
        });
    };

    const getMountainMainPartName = (id) => {
        const mountainMainPart = props.mountainMainParts.find((part) => part.id === id);
        return mountainMainPart ? mountainMainPart.name : '';
    };

    const {data, setData, post, put, processing, errors, reset, cancel, clearErrors } = useForm({
        markers: props?.point === undefined? [] : [ {'lat': Number(props?.point?.lat), 'lng': Number( props?.point?.lng)}],
        name: props?.point?.name || '',
        remember: true,
    })

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

    const getMarkers = (obj) => {
        return [{
                'lat': Number(obj?.lat),
                'lng': Number(obj?.lng)
            }];
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('name')}</h2>}
        >
            <Head title={t('name')}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="flex flex-row w-full justify-end pb-2">
                        <div className="w-[350px]">
                            <MultiSelect value={selectedMountainMain} onChange={(e) => setSelectedMountainMain(e.value)} options={props.mountainMainParts} optionLabel="name" display="chip"
                                         placeholder="Wszystkie"  className="w-full md:w-20rem"
                                         maxSelectedLabels={5}
                            />
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="card w-full p-fluid">
                            <DataTable
                                value={points}
                                sortField={sort}
                                sortOrder={sortOrder}
                                onSort={event => {
                                    setSort(event.sortField);
                                    setSortOrder(event.sortOrder);
                                }}
                                removableSort
                                tableStyle={{ width: "max-content" }}
                                loading={loading}
                            >
                                {columns.map((col, i) => (
                                    <Column key={col.field} field={col.field} header={col.header} sortable />
                                ))}

                                <Column body={actionTemplate} headerClassName="w-10rem" expander />
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

                <Dialog header={globalTranslation.t('delete.descr') + modalData.name} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <GoogleMapComponent markers={getMarkers(modalData)} />
                    <p className="m-0 gap-x-2 flex">
                        <p>{t('latitude')}: {modalData.lat}</p>
                        <p>{t('longitude')}: {modalData.lng}</p>

                    </p>
                    <div className="flex flex-row gap-x-2 justify-end">
                        <Button label={globalTranslation.t('delete')} className={"bg-red-600 hover:bg-red-500"}
                                onClick={() => removeElement(modalData)}/>
                        <Button label={globalTranslation.t('cancel')} className={"bg-blue-600 hover:bg-red-500"}
                                onClick={() => setVisible(false)}/>
                    </div>
                </Dialog>
            }
            <Toast ref={toast}/>
        </Layout>
    );
}
