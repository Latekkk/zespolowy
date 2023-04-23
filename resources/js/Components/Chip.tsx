import {GiMountains} from "react-icons/gi";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import Button from "./Button";
import InputError from "@/Components/InputError";

export default function Chip({ label, onRemove, error }) {
    return (
        <div className="flex flex-row bg-[#e0e0e0] px-2 text-center items-center w-[220px] rounded-2xl h-10">
            <GiMountains className="text-gray-600 w-[32px] h-[32px]" style={{width: 32, height: 32 }}/>
            <span className="w-full">{label}</span>
            <CiCircleRemove className="text-red-700 w-[32px] h-[32px] cursor-pointer" onClick={onRemove}/>
            <InputError message={error}/>
        </div>
    );
}
