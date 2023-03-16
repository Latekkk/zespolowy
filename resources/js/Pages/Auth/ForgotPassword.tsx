import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import {useTranslation} from "react-i18next";

export default function ForgotPassword({ status }) {
    const {t} = useTranslation(['auth']);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

                <div className="flex flex-col items-center justify-end mt-4 font-medium text-sm">
                {t('forgot.password.descr')}
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className={"flex flex-col mx-36 my-12 items-center"}>

                <div className={"flex w-max"}>

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {t('email.password.reset.link')}
                    </PrimaryButton>
                </div>
            </form>

                </div>
            </div>
        </GuestLayout>
    );
}
