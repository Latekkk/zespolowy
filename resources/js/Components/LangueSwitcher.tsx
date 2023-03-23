import {useTranslation} from 'react-i18next';
import {Menu} from 'primereact/menu';
import {Toast} from 'primereact/toast';
import {useEffect, useRef, useState} from 'react';
import {Button} from 'primereact/button';
import Flag from 'react-world-flags'


function LanguageSwitcher() {
    const {i18n} = useTranslation();

    const menu = useRef(null);
    const toast = useRef(null);
    const [items, setItems] = useState([])

    const {t} = useTranslation(['languageSwitcher'])

    const getCurrentLanguage = () => {
        return t('ChangedToLanguage')
    }

    const getLabel = () => {
        return t('label')
    }

    const getSummary = () => {
        return t('summary')
    }
    const setLanguage = () => {
        setItems(
            [
                {
                    label: getLabel(),
                    items: [
                        {
                            label: 'Polski',
                            short: 'pl',
                            command: (data) => {
                                i18n.changeLanguage(data.item.short)
                                toast.current.show({
                                    severity: 'success',
                                    summary: getSummary(),
                                    detail: getCurrentLanguage() + ' ' + data.item.label,
                                    life: 3000
                                });
                            }
                        },
                        {
                            label: 'English',
                            short: 'en',
                            command: (data) => {
                                i18n.changeLanguage(data.item.short)
                                toast.current.show({
                                    severity: 'success',
                                    summary: getSummary(),
                                    detail: getCurrentLanguage() + ' ' + data.item.label,
                                    life: 3000
                                });
                            }
                        }
                    ]
                }
            ]
        )
    }

    useEffect(() => {
        setLanguage();
    }, []);


    useEffect(() => {
        setLanguage();
    }, [i18n]);

    const getFlag = () => {
        return (
            <Flag code={i18n.language === 'en'? 'gb' : i18n.language ?? 'gb'} height="16"  />
        )
    }

    return (
        <div className="relative ">
            <div className="card flex justify-content-center">
                <Toast ref={toast}></Toast>
                <Menu model={items} popup ref={menu}/>
                <Button label={getFlag()} className="w-12 p-0 bg-white border-black" onClick={(e) => menu.current.toggle(e)}>{getFlag()} </Button>
            </div>
        </div>
    );
}

export default LanguageSwitcher;