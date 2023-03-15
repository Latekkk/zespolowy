import GuestLayout from '@/Layouts/GuestLayout';
import {Head, useForm} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Create() {

    const {t} = useTranslation(['common'])
    const {data, setData, post, processing, errors} = useForm({
        title: "",
        description: "",
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
        post('/advertisement')
    }

    return (
        <GuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Aktualności"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="title">Tytuł:</label>
                                <input id="title" value={data.title} onChange={handleChange}/>
                                {errors.title && <div>{errors.title}</div>}
                                <ReactQuill theme="snow" modules={modules} value={data.description} onChange={((e) => handleChange(e, 'description'))}/>
                                {errors.description && <div>{errors.description}</div>}
                                <button type="submit" disabled={processing}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
