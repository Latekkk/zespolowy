import {Link} from "@inertiajs/react";
import React from "react";
export default function DataTableActionLink({routeName, parameters = {}, icon, color = 'blue'}) {
//Nie kopiować mam to w inż
    const getClass = () =>
    {
        return `bg-${color}-700 hover:bg-${color}-500 px-2`
    }

    return (
            <Link className={getClass()} href={route(routeName, parameters)}
                  method="get" as="button" type="button">
                <i
                    className={`pi ${icon} text-white`}
                   style={{fontSize: '1.5rem'}}>
                </i>
            </Link>

    );
}
