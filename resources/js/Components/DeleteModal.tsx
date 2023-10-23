import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import PrimaryButton from '@/Components/PrimaryButton';
import CancelButton from '@/Components/CancelButton';
import {useTranslation} from "react-i18next";
import {router, usePage} from '@inertiajs/react';

const DeleteModal = ({modalData, visible, setVisible, removeElement, parameters }) => {
//Nie kopiować mam to w inż

    const globalTranslation = useTranslation(['global'])

    const token = usePage().props.token
    const handleClose = () => {
        setVisible(false);
    };
    const handleDelete = () => {
        if (typeof removeElement === 'string') {
            router.delete(route(removeElement, parameters), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                onSuccess: page => {
                    handleClose();
                    router.visit(page.url, {
                        only: ['data'],
                    })
                }
            })
        } else {
            removeElement();
            handleClose();
        }
    };

    return (
        <>
            {modalData && (
                <Dialog
                    header={globalTranslation.t('delete.descr') + modalData?.name}
                    visible={visible}
                    maximizable
                    style={{width: '50vw'}}
                    onHide={handleClose}
                >
                    <div className="flex flex-row gap-x-2 justify-end">
                        <div className="flex flex-row w-[300px] gap-x-4">
                            <PrimaryButton className="bg-red-600 hover:bg-red-500" onClick={handleDelete}>
                                {globalTranslation.t('delete')}
                            </PrimaryButton>
                            <CancelButton onClick={handleClose}/>
                        </div>
                    </div>
                </Dialog>
            )}
        </>
    );
};

export default DeleteModal;
