import InputError from "@/Components/InputError";
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
            {/*<InputError message={error?error:''}/>*/}
        </div>
    );
}
