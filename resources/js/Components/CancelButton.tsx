import {useTranslation} from "react-i18next";
export default function CancelButton({onClick, process: boolean = false}) {
    const globalTranslation = useTranslation(['global'])
//Nie kopiować mam to w inż
    return (
        <button
            onClick={onClick}
            type={'button'}
            className={`z-10 w-full justify-center inline-flex items-center px-4 py-5 md:py-2 bg-secondary border border-dark rounded-md font-semibold text-white uppercase tracking-widest hover:bg-secondaryTone focus:bg-secondaryTone active:bg-secondaryTone focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer`}
        >
            {globalTranslation.t('cancel_button')}
        </button>
    );
}
