import React, {useEffect, useRef, useState} from "react";
import {Head, Link, router, usePage} from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {DataTable} from "primereact/datatable";
import {Paginator} from "primereact/paginator";
import {Column} from "primereact/column";
import DataTableActions from "@/Components/DataTableActions";
import DeleteModal from "@/Components/DeleteModal";
import { useTranslation } from "react-i18next";

interface ColumnMeta {
    field: string;
    header: string;
}


export default function Index({data, sort, sortOrder}) {
    //Nie kopiować mam to w inż
    const userPointToAcceptTranslation = useTranslation(['userPointToAccept'])
    const pageProps = usePage().props;
    const [values, setValues] = useState(data?.data);
    const [loading, setLoading] = useState<boolean>(false);

    const [visible, setVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState(null);

    const columns: ColumnMeta[] = [
        {field: 'mountain_section.name', header: userPointToAcceptTranslation.t('mountain_section.name')},
        {field: 'approved_by.name', header: userPointToAcceptTranslation.t('approved_by.name')},
        {field: 'user.name', header: userPointToAcceptTranslation.t('user.name')},
        {field: 'status', header: userPointToAcceptTranslation.t('status')},
    ];

    const onPageChange = (event, page) => {
        setLoading(true)
        const sortOrder = event.sortOrder === 1? 'asc' : 'desc';

        router.visit(
            route('userPointsToAccept.index',
                {
                    page: page ?? event.page + 1,
                    paginate: event.rows,
                    sort: event?.sortField ?? 'name',
                    sortOrder: sortOrder ?? 'asc',
                    onSuccess: page => {
                        setLoading(false)
                    },
                    onError: errors => {
                    }
                })
        )
    };

    const showModal = (data) => {
        setVisible(true)
        setModalData(data)
    }
    const actionTemplate = (rowData) => {
        return (
            <DataTableActions
                editRouteName={'userPointsToAccept.edit'}
                showRouteName={'userPointsToAccept.show'}
                showModal={showModal}
                rowData={rowData}
            />
        );
    };

    return (
        <Layout
            props={pageProps}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{userPointToAcceptTranslation.t('name')}</h2>}
        >
            <Head title={userPointToAcceptTranslation.t('name')}/>
            <div className="p-8 min-h-[800px]">
                <DataTable
                    value={values}
                    sortField={sort}
                    sortOrder={sortOrder}
                    onSort={event => {
                        onPageChange(event, 1);
                    }}
                    removableSort
                    loading={loading}
                >
                    {columns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header} style={{maxHeight: "60px"}}
                                sortable/>
                    ))}

                    <Column body={actionTemplate} headerClassName="w-10rem" expander/>
                </DataTable>
                <Paginator first={ data.current_page * data.per_page -1}
                           rows={data?.per_page}
                           totalRecords={data?.total}
                           rowsPerPageOptions={[5, 15, 20, 30]}
                           pageLinkSize={7}
                           onPageChange={onPageChange}
                />
            </div>

            <DeleteModal
                visible={visible}
                setVisible={setVisible}
                modalData={modalData}
                removeElement={'userPointsToAccept.destroy'}
                parameters={{userPoints: modalData?.id}}
            />

        </Layout>
    );
}
