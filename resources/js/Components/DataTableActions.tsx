import React from "react";
import ShowButton from "@/Components/ShowButton";
import EditButton from "@/Components/EditButton";
import RemoveButton from "@/Components/RemoveButton";

export default function DataTableActions({rowData, editRouteName = '', showRouteName = '', showModal, extraButtons = null, removeRoute = null, extraDeleteParameters = null}) {
//Nie kopiować mam to w inż
    return (
        <div className="flex flex-wrap gap-2 full justify-end justify-items-end h-12">
            {extraButtons && extraButtons?.map((element) => element)}
            {showRouteName && <ShowButton routeName={showRouteName} id={rowData.id} />}
            {editRouteName && <EditButton routeName={editRouteName} id={rowData.id}/>}
            {showModal && <RemoveButton rowData={rowData} showModal={showModal} removeRoute={removeRoute} extraDeleteParameters={extraDeleteParameters} />}
        </div>
    );
}
