import * as url from "url";


export default function Badge({badges}) {

    const host = window.location.origin + '/storage/photos/'
    return (
        <>
            {
                badges.map((badge, index) =>
                    <div className="flex flex-col w-full justify-center gap-y-3 p-4" key={badge}>
                        <h1 className="text-center text-2xl font-bold">
                            {badge.name}
                        </h1>
                        <img src={host + badge.photos[0].file_name } />
                        <p className="text-center">
                            Wymagane punkty do zdobycia odznaki:  {badge.point}
                        </p>
                    </div>

                )

            }
        </>
    );
}
