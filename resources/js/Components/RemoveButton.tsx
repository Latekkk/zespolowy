import React from "react";
import {Button} from "primereact/button";

export default function RemoveButton({rowData, showModal, removeRoute, extraDeleteParameters}) {
//Nie kopiować mam to w inż

    return (
        <Button type="button"
                className="bg-red-700 hover:bg-red-500 focus:bg-red-500"
                icon="pi pi-delete-left"
                onClick={() => showModal(rowData, removeRoute, extraDeleteParameters)}
        />
    );
}
