import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import Button from "@/Components/Button";
import React, {useEffect, useRef, useState} from "react";
import PointService, {Point} from "@/Pages/Point/service/PointService";
import Input from "@/Components/Input"
import { Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {Toast} from "primereact/toast";
import {Simulate} from "react-dom/test-utils";
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
    const mountainsSection = props.mountainsSection ?? null;

    const {t} = useTranslation(['mountainsSection']);
    const [points, setPoints] = useState<Point[]>([]);
    const [sort] = useState<string>('id');
    const [sortOrder] = useState<string>('1');
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedEndPoint, setSelectedEndPoint] = useState<String | null>('');
    const [selectedStartPoint,setSelectedStartPoint] = useState<String | null>('');
    const toast = useRef<Toast>(null);
    const {data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: mountainsSection?.name || "",
        entry_points: mountainsSection?.entry_points || "",
        points_for_descent: mountainsSection?.points_for_descent || "",
        start_point : mountainsSection?.start_point || "",
        end_point : mountainsSection?.end_point || "",
        remember: true
    })

    const columns: ColumnMeta[] = [
        {field: 'id', header: '#'},
        {field: 'name', header: 'Name'},
        {field: 'lat', header: 'Lat'},
        {field: 'lng', header: 'Len'}
    ];

    function handleChange(e, keyName, val) {
        const key = e?.target?.id || keyName;
        let value = e?.target?.value || val || e || '';
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        mountainsSection === null ?post(route('mountainsSection.store')): put(route('mountainsSection.update', mountainsSection.id))
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

    const pointOptionTemplate = (option: Point) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    function setNameAndStartOrEndPoint(number, value){
        if(number == 1) {
            setSelectedStartPoint(value.name);
            setData(data => ({
                ...data,
                ["start_point"]: value.id,
            }))
        }else if(number == 2){
            setSelectedEndPoint(value.name);
            setData(data => ({
                ...data,
                ["end_point"]: value.id,
            }))
        }
        setData(data => ({
            ...data,
            ["name"]: selectedStartPoint + " - " + selectedEndPoint,
        }))
    }

    const showModal = (data) => {
        setVisible(true)
    }
    const toastShow = (summary, severity, content) => {
        toast.current?.show({severity: severity, summary: summary, detail: content});
    };

    const getPoints = () => {
        PointService.getPoints( sort, sortOrder).then((data: Point[]) => {
            setPoints(data.data);
        });
    }

    const setDefaultForm = () => {
        reset();
        clearErrors()
    }

    useEffect(() => {
        getPoints()
    }, []);

    useEffect(() => {
        getPoints()
    }, [ sort, sortOrder]);

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
                                    <p> name: {data.name}</p>
                                    <div className="card flex justify-content-center">
                                        <Dropdown value={selectedStartPoint} onChange={(e:DropdownChangeEvent) => setNameAndStartOrEndPoint(1,e.value)} options={points} optionLabel="name" placeholder="Select a start Point"
                                                  filter valueTemplate={selectedPointTemplate} itemTemplate={pointOptionTemplate } className="w-full md:w-14rem" />

                                    </div>
                                        <Dropdown value={selectedEndPoint} onChange={(e:DropdownChangeEvent) =>setNameAndStartOrEndPoint(2,e.value)} options={points} optionLabel="name" placeholder="Select a end Point"
                                              filter valueTemplate={selectedPointTemplate} itemTemplate={pointOptionTemplate } className="w-full md:w-14rem" />
                                    <div className="flex flex-row gap-2 w-max">
                                    <Input labelText={t('entry_points')}
                                           name='entry_points'
                                           value={data.entry_points}
                                           error={errors.entry_points}
                                           onChange={handleChange}
                                           placeholder='Punkty wejścia'
                                           type='number'
                                    />
                                    <Input labelText={t('points_for_descent')}
                                           name='points_for_descent'
                                           value={data.points_for_descent}
                                           error={errors.points_for_descent}
                                           onChange={handleChange}
                                           placeholder='Punkty zejścia '
                                           type='number'
                                    />
                                    </div>
                                </div>
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
            <Toast ref={toast}/>
        </Layout>
    );
}
