import React, {useEffect, useRef, useState} from 'react';

import Layout from '@/Layouts/Layout';
import {Head} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';

import {Column} from 'primereact/column';

import {DataTable} from 'primereact/datatable';
import {Paginator} from 'primereact/paginator';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import ContactService from "@/Pages/Contact/service/ContactService";
import {InputSwitch} from "primereact/inputswitch";
import {BiShow} from "react-icons/bi";

import {TabPanel, TabView} from 'primereact/tabview';

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
    const [responseSwitch, setResponseSwitch] = useState(false)
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
    }, [page, paginate, sort, sortOrder, responseSwitch]);

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
                <Button type="button" className="bg-blue-700 px-2 hover:bg-blue-500 justify-center"
                        onClick={() => showContactModal(rowData)} rounded style={{width: 42}}><BiShow/></Button>

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
                toastShow('Skontaktowano', 'info', data.name)
            }
        );
    }

    const ListPage = () => {
        return (

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="flex flex-row gap-2 p-2 w-full justify-end">
                    <p>Skontaktowano?</p>
                    <InputSwitch checked={responseSwitch} onChange={(e) => setResponseSwitch(e.value)}/>
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
                        tableStyle={{width: "max-content"}}
                        loading={loading}
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
        )
    }

    return (
        <Layout
            props={props}
            header={''}
        >
            <Head title={t('name')}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <TabView activeIndex={props.auth.user !== null? 0: 1}>
                        {
                            props.auth.user !== null &&
                            <TabPanel header="Lista kontaktów" leftIcon="pi pi-calendar mr-2">
                                <ListPage/>
                            </TabPanel>
                        }
                        <TabPanel header="Dane kontaktowe" rightIcon="pi pi-user ml-2">
                                <div className="flex flex-col w-full text-center gap-y-4 text-black">
                                    <div className="bg-gray-300 rounded-xl m-3 p-3">
                                        <h1 className="font-bold text-2xl  p-4">
                                            Adres do korespondencji
                                        </h1>
                                        <p>Hutniczo-Miejski Oddział PTTK w Krakowie</p>
                                        <p>ul. Targowa  2</p>
                                        <p>62-800 Kalisz</p>
                                        <p>Komisja Turystyki Górskiej</p>
                                        <p>NIP 618-00-42-574</p>
                                        <p>nr konta:</p>
                                        <p>„ Santander Bank Polska S.A.”</p>
                                        <p>33 10901128 00000000 12015712</p>
                                    </div>
                                    <div className="bg-gray-300 rounded-xl m-3 p-3">
                                        <h1 className="font-bold text-2xl text-black p-4">
                                            Biuro oddziału czynne
                                        </h1>
                                        <p></p>
                                        <p>Poniedziałek - Piątek: 8:00 - 16:00</p>
                                        <p>Sobota - Niedziela: Nieczynne</p>
                                    </div>
                                    <div className="bg-gray-300 rounded-xl m-3 p-3">

                                        <h1 className="font-bold text-2xl text-black p-4">
                                            Kontakt
                                        </h1>
                                        <p>Poczta: info@pttk.kalisz.pl,</p>
                                        <p>Telefon: 509-360-171</p>
                                    </div>
                                </div>
                        </TabPanel>

                    </TabView>
                </div>
            </div>


            {
                modalData && props.auth.user !== null &&

                <Dialog header={`Czy chcesz usunąć : "${modalData.name}"`} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <div className="flex flex-col gap-y-2 m-0 ">
                        <p>tytuł : {modalData.title}</p>
                        {
                            modalData.phone_number && (
                                <p>phone number : {modalData.phone_number}</p>
                            )
                        }
                        {
                            modalData.email && (
                                <p>email : {modalData.email}</p>
                            )
                        }
                        <p>opis : {modalData.description}</p>
                    </div>
                    <div className="flex flex-row gap-x-2 justify-end">
                        <Button label="Anuluj" className={"bg-blue-600 hover:bg-red-500"}
                                onClick={() => setVisible(false)}/>
                        <Button label="Usuń" className={"bg-red-600 hover:bg-red-500 focus:bg-red-500 border-red-600"}
                                onClick={() => removeElement(modalData)}/>
                    </div>
                </Dialog>
            }

            {
                modalContactData  && props.auth.user !== null &&

                <Dialog header={`Dane kontaktowe : "${modalContactData.name}"`} visible={visibleContact} maximizable
                        style={{width: '50vw'}} onHide={() => setVisibleContact(false)}>
                    <div className="flex flex-col gap-y-2 m-0 ">
                        <p>tytuł : {modalContactData.title}</p>
                        {
                            modalContactData.phone_number && (
                                <p>phone number : {modalContactData.phone_number}</p>
                            )
                        }
                        {
                            modalContactData.email && (
                                <p>email : {modalContactData.email}</p>
                            )
                        }
                        <p>opis : {modalContactData.description}</p>
                    </div>
                    <div className="flex flex-row gap-x-2 justify-end">
                        {
                            modalContactData.response == 0 && (
                                <>
                                    <Button label="Anuluj" className={"bg-blue-600 hover:bg-red-500"}
                                            onClick={() => setVisibleContact(false)}/>
                                    <Button label="Skontaktowano"
                                            className={"bg-green-600 hover:bg-green-500 focus:bg-green-500 border-green-600"}
                                            onClick={() => {
                                                setResponse(modalContactData)
                                                setVisibleContact(false)
                                            }}/>
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
