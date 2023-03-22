import {useTranslation} from 'react-i18next';

export default function input({labelText, name, value, onChange, error, readOnly = false, type = 'text'}) {

    const {t} = useTranslation(['input'])

    return (
        <div className="flex flex-col gap-y-2 shadow-xl bg-gray-200 rounded p-2">
            <label htmlFor={name}>{labelText}</label>
            <input
                className={`rounded border px-1 w-min-[200px]'+ ${error ? 'border-red-500' : 'border-black'}`}
                id={name}
                value={typeof value == "object" ? '' : value}
                placeholder={!readOnly && (t('entryValue') + ' ' + name)}
                type={type}
                readOnly={readOnly} onChange={((e) => onChange(e))}/>
            {
                error && <div className="text-red-500">{error}</div>
            }
        </div>
    )
}
