import {useTranslation} from 'react-i18next';

export default function FileInput({labelText, name, value, onChange, error}) {

    const inputTranslation = useTranslation(['input'])

    return (
        <div className="flex flex-col gap-y-2 shadow-xl bg-gray-200 rounded p-2 ">
            <label htmlFor={name}>{labelText}</label>
            <div className="flex w-[82px]">
                <input
                    className={`rounded'+ ${error ? 'border-red-500' : 'border-black'}`}
                    id={name}
                    value={typeof value == "object" ? '' : value}
                    type="file"
                    onChange={((e) => onChange(e))}/>

            </div>
            <p>{inputTranslation.t('selected.file')}: {value.name}</p>
            {
                error && <div className="text-red-500">{error}</div>
            }
        </div>
    )
}
