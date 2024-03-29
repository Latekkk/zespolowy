import Dropdown from "@/Components/Dropdown";

import { FiSettings } from "react-icons/fi";
import {useTranslation} from "react-i18next";
import { DateTime } from "luxon";
import {Toast} from "primereact/toast";
import React, { useRef } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";

export default function Advertisement({advertisement,auth, toast}: any) {
    const {t} = useTranslation(['advertisement'])
    const globalTranslation = useTranslation(['global'])

    const getDate = (time, full) => {
       const date =  DateTime.fromISO(time.replace(' ','T')).setLocale('pl');

        return full? date.toFormat("dd'.'LL'.'yyyy HH:MM:ss") : date.toFormat("dd'.'LL'.'yyyy")
    }
    return (
        <>
            <div className="rounded overflow-hidden shadow-lg w-full min-h-[150px]">
                    <div className="px-6 py-4 w-full">
                        {(auth && auth.role && (auth.role === 'squaduser' || auth.role === 'admin')) &&
                            <div className="relative w-full items-end ">
                                <div className="w-full absolute flex justify-end hidden sm:flex sm:items-center sm:ml-6 pr-4">
                                    <div className="ml-3 w-max">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <FiSettings />

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
                                                <div className="flex flex-col">
                                                    <PrimaryButton
                                                        onClick={() => router.visit(route('advertisement.edit', advertisement.slug))}
                                                        type={'button'}> {globalTranslation.t('edit')}
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className={'bg-red-500 hover:bg-red-600'}
                                                        onClick={() => router.delete(route('advertisement.destroy', advertisement.slug), {
                                                            onSuccess: params =>{

                                                                toast.current?.show({severity: params.props.toast.value.severity, summary: params.props.toast.value.summary, detail: params.props.toast.value.content});
                                                            }
                                                        })}
                                                        type={'button'}> {globalTranslation.t('remove')}
                                                    </PrimaryButton>
                                                </div>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="flex flex-row justify-between font-bold text-xl mb-2 my-2 p-4 shadow-lg">
                            <p>{advertisement.title}</p>
                            <div className="flex gap-x-2 text-xs mr-12 bg-gray-200 p-4 rounded shadow">
                                <p>{t('valid.time.from')} {getDate(advertisement.time_from)}</p>
                                {advertisement.time_to && <p>{t('valid.time.to')} {getDate(advertisement.time_to)}</p>}
                            </div>

                        </div>
                        <p className="shadow-lg p-4 min-h-[100px]"  dangerouslySetInnerHTML={{ __html: advertisement.description }}>
                        </p>
                        <div className="text-xs">
                            <p>{t('time.of.creation')} {getDate(advertisement.created_at, true)}</p>
                            {advertisement.updated_at !== advertisement.created_at &&
                                <p>{t('time.of.updating')} {getDate(advertisement.updated_at, true)}</p>
                            }

                        </div>
                    </div>

            </div>
        </>
    );
}
