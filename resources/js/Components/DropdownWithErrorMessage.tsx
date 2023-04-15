import {useTranslation} from 'react-i18next';
import InputError from "@/Components/DropdownWithErrorMessage";
import {Dropdown} from "primereact/dropdown";
import React from "react";

export default function DropdownWithErrorMessage({name, value, onChange, error, placeholder, options, optionLabel, className, extraClass}) {

    return (
        <div className={`flex flex-col gap-y-2 shadow-xl bg-gray-200 rounded p-2 w-full  + ${extraClass} `}>
            <label htmlFor={name}>{value}</label>

            <Dropdown value={typeof value == "object" ? '' : value}
                      onChange={(e) => onChange(e.value)}
                      options={options}
                      optionLabel={optionLabel}
                      placeholder={placeholder || (name) || ''}
                      className={className}
                      filter
            />
            {/*<p className={'text-sm text-red-600 ' + className}>*/}
            {/*    {error}*/}
            {/*</p>*/}
        </div>
    );
}
