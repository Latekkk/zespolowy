import {useTranslation} from 'react-i18next';
import {Menu} from 'primereact/menu';
import {Toast} from 'primereact/toast';
import {useEffect, useRef, useState} from 'react';
import {Button} from 'primereact/button';
import Flag from 'react-world-flags'
import axios from 'axios';
import {Inertia} from "@inertiajs/inertia";


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
                                Inertia.visit(route('translationSwitcher', {'lang': 'pl'}))
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
                                Inertia.visit(route('translationSwitcher', {'lang': 'en'}))
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
            <Flag code={i18n.language.slice(0, 2) === 'en' ? 'gb' : i18n.language.slice(0, 2) ?? 'gb'} height="16"
                  alt={i18n.language.slice(0, 2) === 'en' ? 'gb' : i18n.language.slice(0, 2) ?? 'gb'}/>
        )
    }

    const changeLanguage = (e) => {

        menu.current.toggle(e);
        setLanguage();


    }

    const setLanguageBackend = () => {
        axios.post('/language', {locale: i18n.language.slice(0, 2)})
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="relative ">
            <div className="card flex justify-content-center">
                <Toast ref={toast}></Toast>
                <Menu model={items} popup ref={menu}/>
                <Button label={getFlag()} className="w-12 p-0 bg-white border-black"
                        onClick={(e) => changeLanguage(e)}>{getFlag()} </Button>
            </div>
        </div>
    );
}

export default LanguageSwitcher;
