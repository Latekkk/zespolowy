import React, {useState, useEffect, useRef} from 'react';
import {Inertia} from '@inertiajs/inertia'

import Layout from '@/Layouts/Layout';
import {Head, Link} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';

import {Column} from 'primereact/column';

import {DataTable} from 'primereact/datatable';
import {Paginator} from 'primereact/paginator';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import ContactService from "@/Pages/Contact/service/ContactService";
import {InputSwitch} from "primereact/inputswitch";
import { BiShow } from "react-icons/bi";

 interface Contact {
    id: number;
    name: string;
    title: string;
    email: string;
    phone_number: string;
    description: string;
    response: boolean;
}

interface ColumnMeta {
    field: string;
    header: string;
}

export default function Index(props: any) {
    const {t} = useTranslation(['contact'])
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(15);
    const [totalRecords, setTotalRecords] = useState(0)
    const [first, setFirst] = useState(0);
    const [sort, setSort] = useState<string>('id')
    const [sortOrder, setSortOrder] = useState<string>('1')

    const [visible, setVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<Contact>();


    const [visibleContact, setVisibleContact] = useState<boolean>(false);
    const [modalContactData, setContactModalData] = useState<Contact>();
    const [responseSwitch, setResponseSwitch] = useState()
    const toast = useRef<Toast>(null);

    const columns: ColumnMeta[] = [
        {field: 'id', header: '#'},
        {field: 'name', header: 'Name'},
        {field: 'title', header: 'Title'},
        {field: 'description', header: 'descripton'},
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
    }, [page, paginate, sort, sortOrder,responseSwitch]);

    const getPoints = () => {
        ContactService.getContacts(paginate, page, sort, sortOrder, responseSwitch).then((data: Contact[]) => {
            setContacts(data.data);
            setLoading(false);
            setTotalRecords(data.total)
        });
    }

    const showModal = (data) => {
        setVisible(true)
        setModalData(data)
    }
    const showContactModal = (data) => {
        setVisibleContact(true)
        setContactModalData(data)
    }

    const actionTemplate = (rowData, column) => {
        return (
            <div className="flex flex-wrap gap-2">

                <Button type="button" className="bg-blue-700 px-2 hover:bg-blue-500 w-[42px] justify-center"
                        onClick={() => showContactModal(rowData)} rounded><BiShow/></Button>

                <Button type="button" className="bg-red-700 hover:bg-red-500 focus:bg-red-500" icon="pi pi-delete-left"
                        onClick={() => showModal(rowData)} rounded></Button>
            </div>
        );

    };

    const removeElement = (data) => {
        ContactService.removeContact(data.id).then((e) => {
                getPoints()
                setVisible(false)
                toastShow('Usunięto', 'error', data.name)
            }
        );
    }

    const setResponse = (data) => {
        ContactService.setResponse(data.id).then((e) => {
                getPoints()
                setVisible(false)
                toastShow('Skontaktowano', 'error', data.name)
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
                        <div className="flex flex-row gap-2 p-2 w-full justify-end">
                            <p>Skontaktowano?</p>
                            <InputSwitch checked={responseSwitch} onChange={(e) => setResponseSwitch(e.value)} />
                        </div>
                        <div className="card w-full p-fluid">
                            <DataTable
                                value={contacts}
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
                    <div className="flex flex-col gap-y-2 m-0 ">
                        <p>tytuł : {modalData.title}</p>
                        {
                            modalData.phone_number &&  (
                            <p>phone number : {modalData.phone_number}</p>
                            )
                        }
                        {
                            modalData.email &&  (
                            <p>email : {modalData.email}</p>
                            )
                        }
                        <p>opis : {modalData.description}</p>
                    </div>
                    <div className="flex flex-row gap-x-2 justify-end">
                        <Button label="Anuluj" className={"bg-blue-600 hover:bg-red-500"}
                                onClick={() => setVisible(false)}/>
                        <Button label="Usuń"   className={"bg-red-600 hover:bg-red-500 focus:bg-red-500 border-red-600"}
                                onClick={() => removeElement(modalData)}/>
                    </div>
                </Dialog>
            }

            {
                modalContactData &&

                <Dialog header={`Dane kontaktowe : "${modalContactData.name}"`} visible={visibleContact} maximizable
                        style={{width: '50vw'}} onHide={() => setVisibleContact(false)}>
                    <div className="flex flex-col gap-y-2 m-0 ">
                        <p>tytuł : {modalContactData.title}</p>
                        {
                            modalContactData.phone_number &&  (
                                <p>phone number : {modalContactData.phone_number}</p>
                            )
                        }
                        {
                            modalContactData.email &&  (
                                <p>email : {modalContactData.email}</p>
                            )
                        }
                        <p>opis : {modalContactData.description}</p>
                    </div>
                    <div className="flex flex-row gap-x-2 justify-end">

                        {
                            modalContactData.response == 1 && (
                                <>
                                    <Button label="Anuluj" className={"bg-blue-600 hover:bg-red-500"}
                                            onClick={() => setVisibleContact(false)}/>
                                    <Button label="Skontaktowano"  className={"bg-green-600 hover:bg-green-500 focus:bg-green-500 border-green-600"}
                                            onClick={() => setResponse(modalContactData)}/>
                                </>
                            )
                        }

                    </div>
                </Dialog>
            }
            <Toast ref={toast}/>
        </Layout>
    );
}
