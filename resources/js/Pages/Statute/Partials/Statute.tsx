import Dropdown from "@/Components/Dropdown";

import { FiSettings } from "react-icons/fi";
import {useTranslation} from "react-i18next";
import { DateTime } from "luxon";

export default function Statute({statute, auth}: any) {
    const { t } = useTranslation(['global'])
    const getDate = (time, full) => {
        const date =  DateTime.fromISO(time.replace(' ','T')).setLocale('pl');

        return full? date.toFormat("dd'.'LL'.'yyyy HH:MM:ss") : date.toFormat("dd'.'LL'.'yyyy")
    }
    return (
        <>
            <div className="rounded overflow-hidden shadow-lg w-full min-h-[150px]">
                    <div className="px-6 py-4 w-full">
                        {auth === true &&
                            <div className="relative w-full items-end ">
                                <div className="w-full absolute flex justify-end hidden sm:flex sm:items-center sm:ml-6 pr-4">
                                    <div className="ml-3 w-max">

                                    </div>
                                </div>
                            </div>
                        }

                        <p className="shadow-lg p-4 min-h-[100px]"  dangerouslySetInnerHTML={{ __html: statute.content }}>
                        </p>
                        <div className="text-xs">
                            <p>Czas utworzenia: {getDate(statute.created_at, true)}</p>
                            {statute.updated_at !== statute.created_at &&
                                <p>Czas aktualizacji: {getDate(statute.updated_at, true)}</p>
                            }

                        </div>
                    </div>

            </div>
        </>
    );
}
