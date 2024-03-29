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
import UserService from "@/Pages/User/service/UserService";
import { User } from '@/Models/User';
import {InputText} from "primereact/inputtext";

interface ColumnMeta {
    field: string;
    header: string;
}

export default function Index(props: any) {
    const {t} = useTranslation(['users'])
    const globalTranslation = useTranslation(['global'])
    const [users, setUser] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(15);
    const [totalRecords, setTotalRecords] = useState(0)
    const [first, setFirst] = useState(0);
    const [sort, setSort] = useState<string>('id')
    const [sortOrder, setSortOrder] = useState<string>('1')

    const [visible, setVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<User>();
    const [userName, setUserName] = useState('');

    const toast = useRef<Toast>(null);

    const columns: ColumnMeta[] = [
        {field: 'id', header: '#'},
        {field: 'name', header: t('user.name')},
        {field: 'email', header: t('user.email')},
        {field: 'roleFriendlyName', header: t('user.role')}
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
        getUsers()
    }, []);

    useEffect(() => {
        getUsers()
    }, [page, paginate, sort, sortOrder, userName]);
    const getUsers = () => {
        UserService.getUsers(paginate, page, sort, sortOrder, userName ).then((data: User[]) => {
            setUser(data.data);
            setLoading(false);
            setTotalRecords(data.total)
        });
    }


    const visit = (id) => {
        Inertia.visit(route('user.edit', {id: id}))
    }

    const showModal = (data) => {
        setVisible(true)
        setModalData(data)
    }


    const actionTemplate = (rowData, column) => {
        return (
            <div className="flex gap-2">
                <Link className="bg-blue-700 px-2 hover:bg-blue-500" href={route('user.edit', {id: rowData.id})} method="get" as="button" type="button">
                    <i className="pi pi-file-edit text-white" style={{ fontSize: '1.5rem' }}>
                    </i>
                </Link>

                <Button type="button" className="bg-red-700 hover:bg-red-500 focus:bg-red-500" icon="pi pi-delete-left"
                        onClick={() => showModal(rowData)} rounded></Button>
            </div>
        );

    };

    const removeElement = (data) => {
        UserService.removeUser(data.id).then((e) => {
                getUsers()
                setVisible(false)
                toastShow(globalTranslation.t('deleted'), 'error', data.name)
            }
        );
    }


    const SearchInput = () => {
        return (
            <div className="flex justify-content-end ">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className="w-[265px] text-right" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder={t('search.user.ph')} autoFocus={true} />
                </span>
            </div>
        );
    };

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
                            <SearchInput/>

                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="card w-full p-fluid">
                            <DataTable
                                value={users}
                                sortField={sort}
                                sortOrder={sortOrder}
                                onSort={event => {
                                    setSort(event.sortField);
                                    setSortOrder(event.sortOrder)
                                }}
                                removableSort
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
                </div>
            </div>


            {
                modalData &&

                <Dialog header={globalTranslation.t('delete.descr') + modalData.name} visible={visible} maximizable
                        style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <p className="m-0 gap-x-2 flex">
                        <p></p>

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
