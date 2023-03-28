import {useTranslation} from 'react-i18next';

export default function TextArea({labelText, name, value, onChange, error, readOnly = false, placeholder}) {

    const {t} = useTranslation(['input'])

    return (
        <div className="flex flex-col gap-y-2 shadow-xl bg-gray-200 rounded p-2">
            <label htmlFor={name}>{labelText}</label>
            <textarea
                className={`rounded border px-1 w-min-[200px]'+ ${error ? 'border-red-500' : 'border-black'}`}
                id={name}
                value={typeof value == "object" ? '' : value}
                placeholder={!readOnly && placeholder || (t('entryValue') + ' ' + name) || ''}
                readOnly={readOnly} onChange={((e) => onChange(e))}/>
            {
                error && <div className="text-red-500">{error}</div>
            }
        </div>
    )
}
