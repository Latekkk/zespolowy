import React from 'react';
import Dropdown from "../../../Components/Dropdown";
import {FiSettings} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import Button from '@/Components/Button';
import undefinedImages from "@/Functions/undefinedImages";

export default function PartialSign({sign, auth, setModalData,setVisible}) {

    const host = window.location.origin + '/storage/photos/'
    const signTranslation = useTranslation(['sign'])
    const globalTranslation = useTranslation(['global'])
    return (
        <>
            {
                sign && sign.map((sign, index) =>
                    <div className="flex flex-col w-full justify-center gap-y-3 p-4" key={'sign-' + index }>

                        <div className="flex flex-row justify-center w-full text-2xl font-bold">
                            <h1 className="w-full ml-10 text-center">{sign.hiking_trail}</h1>
                            <div className="flex w-auto justify-end">
                                {auth === true &&
                                    <div className="relative w-full items-end ">
                                        <div
                                            className="w-full absolute flex justify-end hidden sm:flex sm:items-center sm:ml-6 pr-4">
                                            <div className="ml-3 w-max">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <FiSettings/>

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                                    </Dropdown.Trigger>

                                                        <Dropdown.Content>
                                                            <Dropdown.Link href={route('sign.edit', sign)}>
                                                                {globalTranslation.t('edit')}
                                                            </Dropdown.Link>

                                                            <button className="block border-none w-full px-4 py-2 text-left text-base  leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out " onClick={() => {setModalData(sign); setVisible(true)}}>{globalTranslation.t('remove')}</button>


                                                        </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <img src={undefinedImages(sign?.photos[0]?.file_name, host, 'images/undefined/signNotFound.jpg')} alt={sign.photos[0]?.file_name}/>
                        <p className="text-center">
                            {signTranslation.t('sign.points')} {sign.description}
                        </p>
                    </div>
                )
            }
        </>
    );
}
