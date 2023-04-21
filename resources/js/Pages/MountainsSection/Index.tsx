import Layout from '@/Layouts/Layout';
import {Head, Link} from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import MountainsSection from "@/Pages/MountainsSection/Partials/MountainsSection";
import {Column} from 'primereact/column';
import React, {useEffect, useRef, useState} from "react";
import MountainsSectionService from "@/Pages/MountainsSection/service/MountainsSectionService";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Paginator} from "primereact/paginator";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import GoogleMapComponent from "@/Components/GoogleMapComponent";
import {Point} from "@/Pages/Point/service/PointService";
import PointService from "@/Pages/Point/service/PointService";
interface MountainsSection {
    name: string;
    entry_points: string;
    points_for_descent: string;
}
interface ColumnMeta {
    field: string;
    header: string;
}
export default function Index(  props: any) {
    const {t} = useTranslation(['mountainsSection'])
    const globalTranslation = useTranslation(['global'])
    const [mountainsSection, setMountainsSection] = useState<MountainsSection[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(15);
    const [totalRecords, setTotalRecords] = useState(0)
    const [first, setFirst] = useState(0);
    const [sort, setSort] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<string>('1');
    const [points, setPoints] = useState<Point[]>([]);

    const [visible, setVisible] = useState<boolean>(false);
    const [visibleMap, setVisibleMap] = useState<boolean>(false);
    const [modalData, setModalData] = useState<MountainsSection>();
    const [modalDataToMap, setModalDataToMap] = useState<MountainsSection>();
    const toast = useRef<Toast>(null);

    const getMarkers = (obj) => {
        return [
            {
                'lat': Number(points.find((p) => p.id === obj?.start_point).lat),
                'lng': Number(points.find((p) => p.id === obj?.start_point).lng),
            },
            {
                'lat': Number(points.find((p) => p.id === obj?.end_point).lat),
                'lng': Number(points.find((p) => p.id === obj?.end_point).lng),
            }
        ];
    }
    const columns: ColumnMeta[] = [
        {field: 'id', header: '#'},
        {field: 'name', header: t('mountain.section.name')},
        {field: 'entry_points', header: t('entrance.points')},
        {field: 'points_for_descent', header: t('points.for.descent')},
    ];
    useEffect(() => {
        getMountainsSection(),
            PointService.getPoints().then((data: Point[]) => {
                setPoints(data.data);
            });
    }, []);

    useEffect(() => {
        getMountainsSection()
    }, [page, paginate, sort, sortOrder]);

    const getMountainsSection = () => {
        MountainsSectionService.getMountainsSections(paginate, page, sort, sortOrder).then((data: MountainsSection[]) => {
            setMountainsSection(data.data);
            setLoading(false);
            setTotalRecords(data.total)
        });
    }
    const onPageChange = (event) => {
        setFirst(event.first);
        setPage(event.page + 1);
        setPaginate(event.rows);
    };
    const showModal = (data) => {
        setVisible(true)
        setModalData(data)
    }
    const showModalToMap = (data) => {
        setVisibleMap(true)
        setModalDataToMap(data)
    }
    const removeElement = (data) => {
        MountainsSectionService.removeMountainsSection(data.id).then(() => {
                getMountainsSection()
                setVisible(false)
                toastShow('Usunięto', 'error', data.name)
            }
        );
    }
    const toastShow = (summary, severity, content) => {
        toast.current?.show({severity: severity, summary: summary, detail: content});
    };
    const actionTemplate = (rowData) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" className="bg-green-600 hover:bg-green-700" icon="pi pi-map"
                        onClick={() => showModalToMap(rowData)} ></Button>
                <Link className="bg-blue-700 px-2 hover:bg-blue-500" href={route('mountainsSection.edit', {id: rowData.id})} method="get" as="button" type="button">
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
            <Head title={t('name')} />
            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                            <DataTable
                                value={mountainsSection}
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
            {
                modalDataToMap &&
                <div className="flex flex-row gap-x-2 justify-end" style={{marginTop: '20px'}}>
                <Dialog header={globalTranslation.t('map') + modalDataToMap.name} visible={visibleMap} maximizable
                        style={{width: '40vw'}} onHide={() => setVisibleMap(false)}>

                    <GoogleMapComponent markers={getMarkers(modalDataToMap)}/>

                    <div className="flex flex-row gap-x-2 justify-end margin">
                        <Button label={globalTranslation.t('cancel')} className={"bg-blue-600 hover:bg-red-500"}
                                onClick={() => setVisibleMap(false)}/>
                    </div>
                </Dialog></div>
            }
            {
            modalData &&

                <Dialog header={t('delete.descr') + modalData.name} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <p className="m-0">
                        <p>{t('entrance.points')}: {modalData.entry_points}</p>
                        <p>{t('points.for.descent')}: {modalData.points_for_descent}</p>
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
