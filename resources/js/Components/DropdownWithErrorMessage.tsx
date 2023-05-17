import InputError from "@/Components/InputError";
import {Dropdown} from "primereact/dropdown";
import React from "react";

export default function DropdownWithErrorMessage({name, value, onChange, error, placeholder, options, optionLabel, className, extraClass, label, valueTemplate}) {


    return (
        <div className={`flex flex-col gap-y-2 shadow-xl bg-gray-200 rounded p-2 w-full  + ${extraClass} `}>
            <label htmlFor={name}>{label}</label>

            <Dropdown value={value}
                      valueTemplate={typeof valueTemplate === "object"? '' : valueTemplate}
                      onChange={(e) => onChange(e.value)}
                      options={options}
                      optionLabel={optionLabel}
                      placeholder={placeholder || (name) || ''}
                      className={className}
                      filter
            />
            <InputError message={error ? error:''}/>
        </div>
    );
}
