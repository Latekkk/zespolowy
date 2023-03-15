import { Link } from "@inertiajs/react";
import {useEffect, useState} from "react";

export default function Pagination(props) {

    function paginate(current_page, last_page, onSides = 2) {
        // pages
        let links = props.props.links;
        let pages = [];
        // Loop through
        pages.push({label: links[0].label, url: links[0].url, active: current_page === 1});
        for (let i = 1; i <= last_page - 3; i++) {
            let offset = (i == 1 || last_page - 3) ? onSides + 1 : onSides;
            if (i === 1 || (current_page - offset < i && current_page + offset > i) ||
                i === current_page || i === last_page - 2) {
                if (pages.filter(obj => {
                    return obj.label === links[i].label
                })) {
                    pages.push({label: links[i].label, url: links[i].url, active: links[i].label == current_page});
                }
            } else if (i == current_page - offset || i == current_page + (offset)) {
                pages.push({label: '...', url: null, active: false});
            }
        }
        if (pages.filter(obj => {
            return obj.label === links[links.length - 2].label
        })) {
            pages.push({
                label: links[links.length - 2].label,
                url: links[links.length - 2].url,
                active: current_page == last_page - 2
            });
        }
        if (pages.filter(obj => {
            return obj.label === links[links.length - 1].label
        })) {
            pages.push({label: links[links.length - 1].label, url: links[links.length - 1].url, active: false});
        }
        return pages;
    }

    const [links, setLinks] = useState()

    useEffect(() => {
        const data = props.props;
        console.log(data)
        setLinks(paginate(data.current_page, data.links.length, 2))
    }, [props]);

    return (
        <>
            {console.log(links)}
            {links?.length > 3 &&
                <div className="flex justify-center mt-4 btn-group flex-row">
                    {links.map((link, index) =>
                        <Link
                            key={link + '-' + index}
                            href={link.url}
                            className={`btn p-2 bg-white border-none hover:bg-gray-300 hover:text-black ${link.active ? "text-blue-500 font-bold" : "text-black"}`}
                        > {link.label}
                        </Link>
                    )}
                </div>
            }

        </>
    );
}
