import Layout from '@/Layouts/Layout';
import {Head, Link, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import Button from "@/Components/Button";
import React, {useEffect, useRef, useState} from "react";
import PathService from "@/Pages/Path/service/PathService";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import PointService, {Point} from "@/Pages/Point/service/PointService";
import Input from "@/Components/Input"
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import {Dialog} from "primereact/dialog";
import {Toast} from "primereact/toast";
interface Point {
    name: string;
    lat: string;
    lng: string;
}

interface ColumnMeta {
    field: string;
    header: string;
}

export default function Form(props) {

    const {t} = useTranslation(['paths']);
    const [points, setPoints] = useState<Point[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sort, setSort] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<string>('1');
    const {data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
    })
    const [visible, setVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<Point>();
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
    const [selectedPointsList, setSelectedPointsList ] = useState<Point[]>([]);
    const columns: ColumnMeta[] = [
        {field: 'id', header: '#'},
        {field: 'name', header: 'Name'},
        {field: 'lat', header: 'Lat'},
        {field: 'lng', header: 'Len'}
    ];
    const toast = useRef<Toast>(null);
    function addToList(){
        setSelectedPointsList([...selectedPointsList, selectedPoint]);
    }
    const selectedPointTemplate = (option: Point, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                   <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };
    const showModal = (data) => {
        setVisible(true)
        setModalData(data)
    }
    const removeElement = (data) => {
        let list:Point[] = Array.from(selectedPointsList);
        list.forEach((element,index)=>{
            console.log(element);
            console.log(index);
            if(element==data){
                list.splice(index);
                setVisible(false);
            }
        });
        setSelectedPointsList(list);
    }
    const toastShow = (summary, severity, content) => {
        toast.current?.show({severity: severity, summary: summary, detail: content});
    };

    const pointOptionTemplate = (option: Point) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    useEffect(() => {
        getPoints()
    }, []);

    useEffect(() => {
        getPoints()
    }, [ sort, sortOrder]);

    const getPoints = () => {
        PointService.getPoints( sort, sortOrder).then((data: Point[]) => {
            setPoints(data.data);
            setLoading(false);
        });
    }
    function handleSubmit(e) {
        e.preventDefault()
        post(route('path.store', data))
    }


    const setDefaultForm = () => {
        reset();
        clearErrors()
        console.log(data);
    }
    const actionTemplate = (rowData, column) => {
        return (
            <div className="flex flex-wrap gap-2">
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
            <Head title=""/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex p-6 text-gray-900 flex flex-col gap-x-2 gap-y-2">
                                <div className="flex flex-col gap-2 w-max">
                                    <div className="card flex justify-content-center">
                                        <Dropdown value={selectedPoint} onChange={(e: DropdownChangeEvent) => setSelectedPoint(e.value)} options={points} optionLabel="name" placeholder="Select a Point"
                                                  filter valueTemplate={selectedPointTemplate} itemTemplate={pointOptionTemplate } className="w-full md:w-14rem" />
                                        <Button type='button' onClick={addToList} disabled={processing} children={'submit'} background="bg-blue-500" textColor={"text-white"} hoverColor={"bg-blue-400"}/>

                                    </div>


                                    <Input labelText={t('name')}
                                           name='name'
                                           value={data.name}
                                           error={errors.name}
                                    />
                                </div>
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="card w-full p-fluid">
                                        <DataTable
                                            value={selectedPointsList}
                                            removableSort
                                            tableStyle={{width: "max-content"}} loading={loading}
                                        >
                                            {columns.map((col, i) => (
                                                <Column key={col.field} field={col.field} header={col.header} sortable/>
                                            ))}

                                            <Column body={actionTemplate} headerClassName="w-10rem" expander/>
                                        </DataTable>
                                    </div>
                                </div>
                                {
                                    modalData &&

                                    <Dialog header={`Czy chcesz usunąć : "${modalData.name}"`} visible={visible} maximizable
                                            style={{width: '50vw'}} onHide={() => setVisible(false)}>
                                        <p className="m-0">
                                            {t('name')}: {modalData.name}
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
                                <div className={'flex flex-row gap-x-2'}>
                                    <Button type='submit' disabled={processing} children={'submit'} background="bg-blue-500" textColor={"text-white"} hoverColor={"bg-blue-400"}/>
                                    <Button type='button' onClick={setDefaultForm} disabled={processing} children={'reset'} background="bg-red-500" textColor={"text-white"} hoverColor={"bg-red-400"}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
