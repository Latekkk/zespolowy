import {useTranslation} from 'react-i18next';
import InputError from "@/Components/InputError";

export default function Input({labelText, name, value, onChange , error, readOnly = false, type = 'text', placeholder, extraClass = ''}) {

    const {t} = useTranslation(['input'])

    return (
        <div className={`flex flex-col gap-y-2 shadow-xl bg-gray-200 rounded p-2 w-full  + ${extraClass} `}>
            <label htmlFor={name}>{labelText}</label>
            <input
                className={`rounded border px-1 w-min-[200px] '+  ${error ? ' border-red-500 ' : ' border-black '}`}
                id={name}
                value={typeof value == "object" ? '' : value}
                placeholder={placeholder || (t('entryValue') + ' ' + name) || ''}
                type={type}
                readOnly={readOnly} onChange={((e) => onChange(e))}/>
            <InputError message={error}/>
        </div>
    )
}
