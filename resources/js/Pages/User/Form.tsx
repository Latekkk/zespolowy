import Layout from '@/Layouts/Layout';
import {useForm, usePage} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import Input from "@/Components/Input"
import Button from "@/Components/Button";
import DropdownWithErrorMessage from "@/Components/DropdownWithErrorMessage";
import React, {useEffect, useRef, useState} from "react";
import {Toast} from 'primereact/toast';
import {Accordion, AccordionTab} from "primereact/accordion";
import PrimaryButton from "@/Components/PrimaryButton";
import {Inertia} from "@inertiajs/inertia";
import {ScrollPanel} from "primereact/scrollpanel";

export default function Form({user,
                                 user_mountain_main_parts,
                                 mountain_main_parts,
                                 roles}) {

    const toast = useRef(null);
    const {t} = useTranslation(['users'])
    const globalTranslation = useTranslation(['global'])

    const createTemplateToDrop = (arr) => {
        return arr.map((item, index) => {
            return {id: index+1, name: t(item)}
        })
    }

    const arrRoles = createTemplateToDrop(roles);
    const props = usePage().props;

    const [selectedRole, setSelectedRole] = useState( user?.role || '');

    const {data, setData, post, put, processing, errors, reset, cancel, clearErrors} = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_repetition: '',
        role: selectedRole,
        remember: true,
    })

    useEffect(() => {
        setData(data => ({
            ...data,
            ['role']: selectedRole.name,
        }))
    }, [selectedRole])

    function handleChange(e, keyName, val) {
        const key = e?.target?.id || keyName;
        let value = e?.target?.value || val || e || '';
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        user === null ? post(route('user.store')) : put(route('user.update', user.id))
    }

    const setDefaultForm = () => {
        reset();
        clearErrors()
    }

        return (
        <Layout
            props={props}
            header={<h2
            className="font-semibold text-xl text-gray-800 leading-tight">{t('creating.editing.a.user')}</h2>}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex flex-row p-2 text-gray-900 gap-x-4">
                                <div className="flex flex-col gap-y-6 w-full pt-4">
                                    <div className="flex flex-col gap-6 w-full">
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
                                    </div>

                                    <DropdownWithErrorMessage value={selectedRole}
                                                              onChange={(e) => setSelectedRole(e)}
                                                              options={arrRoles}
                                                              optionLabel="name"
                                                              placeholder={t('select.role')}
                                                              className="w-full md:w-14rem"
                                                              error={errors.role}
                                                              name={'role'}
                                                              extraClass={undefined}
                                                              label={user === null? (t('user.role') + t('current.role') + user?.role): t('user.role') }
                                                              valueTemplate={undefined}
                                    />

                                </div>

                                <div className="card min-w-[300px] w-[800px]">
                                    <Accordion activeIndex={0}>
                                        <AccordionTab
                                            header={
                                                <div className="flex align-items-center">
                                                    <i className="pi pi-calendar mr-2"></i>
                                                    <span className="vertical-align-middle">{t('authorizations.held')}</span>
                                                </div>
                                            }
                                        >

                                            <ScrollPanel style={{ width: '100%', height: '425px' }}>
                                            {user_mountain_main_parts?.data && user_mountain_main_parts?.data.map((user_mountain_main_part, index) => {
                                                return (
                                                        <div className={'w-full border border-1 p-2 my-2 '} key={user_mountain_main_part.name + '-' + index}>
                                                            <p >{user_mountain_main_part.name} </p>
                                                            <p>{user_mountain_main_part.created_at.split(' ')[0]}</p>
                                                            <p>{user_mountain_main_part.granted}</p>
                                                        </div>
                                                );
                                            })}

                                            </ScrollPanel>
                                        </AccordionTab>
                                        <AccordionTab
                                            header={
                                                <div className="flex align-items-center">
                                                    <i className="pi pi-calendar mr-2"></i>
                                                    <span className="vertical-align-middle">{t('available.entitlements')}</span>
                                                </div>
                                            }
                                        >
                                            {mountain_main_parts.map((mountain_main_part, index) => {
                                                return (
                                                    <div key={mountain_main_part.name + '-' + index} className="flex flex-row justify-between border border-1 p-2 my-2">
                                                        <p>{mountain_main_part.name}</p>
                                                        <PrimaryButton
                                                            type={'button'}
                                                            onClick={() => {
                                                                Inertia.post(route('userMountainMainPartController.store', {
                                                                    user_id: user.id,
                                                                    mountain_main_part_id: mountain_main_part.id
                                                                }));
                                                            }}
                                                            key={mountain_main_part.name + '-add-button'}
                                                        >
                                                            {globalTranslation.t('add')} {mountain_main_part.id} {user.id}
                                                        </PrimaryButton>
                                                    </div>
                                                )
                                            })}
                                        </AccordionTab>
                                    </Accordion>
                                </div>

                            </div>

                            <div className='flex flex-row gap-x-2 p-2 w-full justify-end'>

                                <Button type='button' children={globalTranslation.t('cancel')} onClick={cancel}/>
                                <Button type='button' onClick={setDefaultForm} disabled={processing}
                                        children={globalTranslation.t('reset')} background="bg-red-500"
                                        textColor={"text-white"} hoverColor={"bg-red-400"}/>

                                <Button type='submit' disabled={processing} children={globalTranslation.t('submit')}
                                        background="bg-blue-500" textColor={"text-white"}
                                        hoverColor={"bg-blue-400"}/>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toast ref={toast}></Toast>
        </Layout>
    );
}
