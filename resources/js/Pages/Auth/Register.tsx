import React, {useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import {useTranslation} from "react-i18next";
import Input from "@/Components/Input";

export default function Register() {
    const {t} = useTranslation(['users']);
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_repetition: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_repetition');
        };
    }, []);


    function handleChange(e, keyName, val) {
        const key = e?.target?.id || keyName;
        let value = e?.target?.value || val || e || '';
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('user.register.store'));
    };

    return (
        <GuestLayout>
            <Head title="Register"/>
            <div className={"flex flex-col p-12 my-12 items-center bg-white mx-12 gap-y-2"}>
                <form onSubmit={submit} className={'w-1/3'}>
                    <div className={"flex flex-col w-full gap-y-4"}>
                        <Input labelText={t('user.name')}
                               name='name'
                               value={data.name}
                               error={errors.name}
                               onChange={handleChange}
                               placeholder={t('enter.the.user.name')}
                        />
                        <Input labelText={t('user.email')}
                               name='email'
                               value={data.email}
                               error={errors.email}
                               onChange={handleChange}
                               placeholder={t('enter.the.user.email')}
                        />
                        <Input labelText={t('user.password')}
                               name='password'
                               value={data.password}
                               error={errors.password}
                               onChange={handleChange}
                               placeholder={t('enter.the.user.password')}
                        />
                        <Input labelText={t('user.password.repetition')}
                               name='password_repetition'
                               value={data.password_repetition}
                               error={errors.password_repetition}
                               onChange={handleChange}
                               placeholder={t('enter.the.user.password.repetition')}
                        />

                        <div className="flex items-center justify-end mt-4">
                            <Link
                                href={route('login')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {t('already.registered')}
                            </Link>

                            <PrimaryButton className="ml-4" disabled={processing}>
                                {t('register')}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>

            </div>
        </GuestLayout>
    );
}
