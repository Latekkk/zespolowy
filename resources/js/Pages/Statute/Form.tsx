import Layout from '@/Layouts/Layout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Form(props) {

    const statute = props.statute ?? null;

    const { t } = useTranslation(['statute'])

    const {data, setData, post, put, processing, errors} = useForm({
        content: statute?.content ?? "",
        remember: true,
    })

    const  modules  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link"],
            ["clean"],
        ],

    };

    function handleChange(e, keyName) {
        const key = e?.target?.id || keyName;
        const value = e?.target?.value || e;
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        statute === null? post(route('statute.store')): put(route('statute.update', 1))
    }

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('new.announcement')}</h2>}
        >
            <Head title="Aktualności"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <ReactQuill theme="snow" modules={modules} value={data.content} onChange={((e) => handleChange(e, 'content'))}/>
                                {errors.content && <div>{errors.content}</div>}
                                <button type="submit" disabled={processing}>{t('submit')}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
