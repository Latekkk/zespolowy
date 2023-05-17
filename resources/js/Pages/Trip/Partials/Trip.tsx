import Button from "@/Components/Button";
import React from "react";
import {useTranslation} from "react-i18next";

export default function Trip({section, handleRemoveMountainSection}) {

    const globalTranslation = useTranslation(["global"]);
    return (
        <div key={section.id} className='flex flex-row border-1 border border-gray-400 shadow-xl mx-2 p-1 text-left items-center w-[600px] mb-6'>
            <span className='w-[520px]'>{section.name}</span>
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

