import {Link} from "@inertiajs/react";
import React from "react";

export default function ShowButton({routeName, id, disabled = false}) {
//Nie kopiować mam to w inż
    return (
        <Link
            className={`w-10 h-12 bg-orange-700 justify-center inline-flex items-center px-4 py-5 md:py-2 font-semibold text-white uppercase tracking-widest hover:bg-orange-500 focus:bg-orange-500 active:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                disabled && 'opacity-25'
            }`} href={route(routeName, id)}
            method="get" as="button" type="button">
            <i
                className={`pi pi-eye text-white`}
                style={{fontSize: '1.5rem'}}>
            </i>
        </Link>

    );
}
