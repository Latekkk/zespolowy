export default function Advertisement({description, title}: any) {

    return (
        <>

            <div>
                <div>
                    {title}
                </div>
                <div dangerouslySetInnerHTML={{ __html: description }}>
                </div>
            </div>
        </>
    );
}
