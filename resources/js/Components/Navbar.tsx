import Dropdown from "@/Components/Dropdown";
import {useTranslation} from "react-i18next";
import {Link} from "@inertiajs/react";
import React from "react";

export default function NavBar({navbar, user = null}) {


    const {t} = useTranslation(['navbar'])
    const getLink = (link) => {
        return link.subLinks[0].name +
            (link.subLinks[0].name !== "" ? "." : "") +
            link.subLinks[0].route

    }

    const countOccurrencesInSubLinks = (object, role) => {
        if ( role === null? role = 'guest' : '')

        if (!object.subLinks) {
            return 0;
        }

        const occurrences = object.subLinks.reduce((count, sublink) => {
            if (sublink.can && sublink.can.includes(role)) {
                return count + 1;
            }
            return count;
        }, 0);

        return occurrences;
    }


    return (
        <>
            {navbar.map((link, index) => {
                return (

                    <div className="ml-3 relative" key={index}>
                        {
                            countOccurrencesInSubLinks(link, user?.role) <= 1 ?
                                <>
                                 <span className="inline-flex rounded-md">
                                  <Link href={route(getLink(link))}
                                        method="get"
                                        as="button"
                                        type="button"
                                        className={"inline-flex items-center px-3 py-2 text-sm leading-4 font-medium text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            + (route().current() == getLink(link) ? ' border-b-2 border-purple-600' : ' border-transparent')}>
                                      {t(link.name)}
                                  </Link>

                                </span>
                                </> :
                                <Dropdown>
                                    <Dropdown.Trigger>
                                <span className="inline-flex">
                                  <button
                                      type="button"
                                      className={"inline-flex items-center px-3 py-2 text-sm leading-4 font-medium text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                          + (route().current().includes(link.name) ? ' border-b-2 border-purple-600' : ' border-transparent')}>

                                    {t(link.name)}

                                      <svg
                                          className="ml-2 -mr-0.5 h-4 w-4"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                      <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {link.subLinks.map((subLink, index) => {
                                            return (
                                                <Dropdown.Link
                                                    href={route(
                                                        subLink.name +
                                                        (subLink.name !== "" ? "." : "") +
                                                        subLink.route
                                                    )}
                                                    key={index}
                                                    className={(route().current() == (subLink.name +
                                                        (subLink.name !== "" ? "." : "") +
                                                        subLink.route) ? ' border-b-2 border-purple-600' : ' border-transparent')}
                                                >
                                                    {t(subLink.text === undefined ?
                                                        subLink.name +
                                                        (subLink.name !== "" ? "." : "") +
                                                        subLink.route : subLink.text
                                                    )}
                                                </Dropdown.Link>
                                            );
                                        })}
                                    </Dropdown.Content>


                                </Dropdown>
                        }
                    </div>
                );
            })}
        </>
    );
};
