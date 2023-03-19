
import { useTranslation } from 'react-i18next';

export default function input({labelText, name, value, onChange, error, readOnly = false}) {

    const { t } = useTranslation(['input'])

    return (
        <>
            <label htmlFor={name}>{labelText}</label>
            <input
                className={`rounded border px-1 '+ ${error? 'border-red-500' : 'border-black'}`}
                   id={name}
                   value={typeof value == "object"? '': value}
                   placeholder={!readOnly && (t('entryValue') + ' ' + name)}
                readOnly={readOnly} onChange={((e) => onChange(e))}/>
            {
                error && <div className="text-red-500">{error}</div>
            }
        </>
    )
}
