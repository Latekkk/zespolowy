import Button from "@/Components/Button";
import React from "react";
import {useTranslation} from "react-i18next";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

export default function Trip({section, handleRemoveMountainSection, label}) {
    const globalTranslation = useTranslation(["global"]);

    return (
        <div key={section.id} className='flex flex-row border-1 border border-gray-400 shadow-xl py-1 px-2 text-left items-center w-[800px] mb-6 justify-between'>
            <span className='w-[700px]'>{label}</span>
            <Button
                type="button"
                onClick={() => handleRemoveMountainSection(section)}
                children={globalTranslation.t("remove")}
                background="bg-red-500"
                textColor={"text-white"}
                hoverColor={"bg-red-400"}
            />
        </div>
    );
}

