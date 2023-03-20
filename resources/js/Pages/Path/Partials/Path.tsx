import Dropdown from "@/Components/Dropdown";

import { FiSettings } from "react-icons/fi";
import {useTranslation} from "react-i18next";

export default function Path({description, title, auth, slug}: any) {
    const { t } = useTranslation(['global'])
    return (
        <>
            <div className="rounded overflow-hidden shadow-lg w-full min-h-[150px]">
                    <div className="px-6 py-4 w-full">
                        {auth === true &&
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
                                                <Dropdown.Link href={route('path.edit', slug)}>
                                                    {t('edit')}
                                                </Dropdown.Link>

                                                <Dropdown.Link href={route('path.destroy', slug)}>
                                                    {t('remove')}
                                                </Dropdown.Link>

                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="font-bold text-xl mb-2 my-2 p-4 shadow-lg">{title}</div>
                        <p className="shadow-lg p-4 min-h-[100px]"  dangerouslySetInnerHTML={{ __html: description }}>
                        </p>
                    </div>
            </div>
        </>
    );
}
