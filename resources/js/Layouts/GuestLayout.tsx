import {useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import NavBar from "@/Components/Navbar";
import LangueSwitcher from "@/Components/LangueSwitcher";

export default function GuestLayout({props, header, children,}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const {t} = useTranslation(['navbar'])

    const navbar = [
        {
            "name": "advertisement",
            "route": "home",
            "subLinks": [
                {
                    "name": "",
                    "route": "home"
                },
            ]
        },
        {
            "name": "point",
            "route": "point.index",
            "subLinks": [
                {
                    "name": "point",
                    "route": "index"
                },
            ]
        },
        {
            "name": "mountainSection",
            "route": "mountainSection.index",
            "subLinks": [
                {
                    "name": "mountainSection",
                    "route": "index"
                },
            ]
        },
        {
            "name": "statute",
            "route": "statute.index",
            "subLinks": [
                {
                    "name": "statute",
                    "route": "index"
                },
            ]
        },
        {
            "name": "squad",
            "route": "squad.index",
            "subLinks": [
                {
                    "name": "squad",
                    "route": "index"
                },
            ]
        },
        {
            "name": "contact",
            "route": "contact.index",
            "subLinks": [
                {
                    "text": "contactGuest",
                    "name": "contact",
                    "route": "index"
                },
            ]
        },
        {
            "name": "badge",
            "route": "badge.index",
            "subLinks": [
                {
                    "name": "badge",
                    "route": "index"
                },
                {
                    "name": "badge",
                    "route": "create"
                }
            ]
        },
        {
            "name": "sign",
            "route": "sign.index",
            "subLinks": [
                {
                    "name": "sign",
                    "route": "index"
                },
                {
                    "name": "sign",
                    "route": "create"
                }
            ]
        },
        {
            "name": "settings",
            "route": "settings",
            "subLinks": [
                {
                    "name": "",
                    "route": "login"
                },
                {
                    "name": "",
                    "route": "register"
                },
            ]
        },
        {
            "name": "register",
            "route": "register",
            "subLinks": [
                {
                    "name": "",
                    "route": "register"
                },
            ]
        }
    ]
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex w-full">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                                </Link>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <NavBar navbar={navbar}/>
                            </div>
                            <div className="mt-5 w-full flex justify-end">
                                <LangueSwitcher/>
                            </div>
                        </div>


                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>

    );
}
