import {Link} from "@inertiajs/react";
import React from "react";
export default function EditButton({routeName, id}) {
    //Nie kopiować mam to w inż
    return (
        <Link className={'bg-blue-700 hover:bg-blue-500 px-2'} href={route(routeName, id)}
              method="get" as="button" type="button">
            <i
                className={`pi pi-file-edit text-white`}
                style={{fontSize: '1.5rem'}}>
            </i>
        </Link>

    );
}
