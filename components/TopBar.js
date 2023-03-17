import { Fragment, useEffect, useState } from "react";
import { HambergerMenu, DirectNotification, Setting2, LogoutCurve, Profile2User, Notification, Buildings2, Calendar, Messages2, Category } from 'iconsax-react';
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';
import Cookies from 'universal-cookie';
import { Drawer } from 'antd';

export default function TopBar({ showNav, setShowNav }) {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const router = useRouter();

    const logOut = () => {
        localStorage.setItem('user', null)
        const cookies = new Cookies();
        cookies.remove('africanVoCookie');
        router.push('/login');
    }

    const [user, setUser] = useState()
    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return (
        <div
            className={`bg-white z-10 border-b-[1.5px] border-[#E4E4E4] fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "md:pl-72" : ""
                }`}
        >
            <div className="pl-6 md:flex hidden ">
                {/* <HambergerMenu
                    className="h-7 w-7 text-gray-700 cursor-pointer"
                    onClick={() => setShowNav(!showNav)}
                /> */}
                {/* <svg className="h-7 w-7 text-gray-700 cursor-pointer" onClick={() => setShowNav(!showNav)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="style=linear">
                        <g id="menu-hotdog">
                            <path id="vector" d="M5 6H19" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                            <path id="vector_2" d="M3 12H21" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                            <path id="vector_3" d="M5 18H19" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                        </g>
                    </g>
                </svg> */}

                <svg className={`h-5 w-5 text-gray-700 cursor-pointer` + (showNav ? "cursor-pointer transform -rotate-180" : "")}
                    viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setShowNav(!showNav)}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                        fill="#000000"
                    />
                </svg>
            </div>

            <div className="pl-4 flex md:hidden ">
                {/* <HambergerMenu
                    className="h-7 w-7 text-gray-700 cursor-pointer"
                    onClick={() => setShowNav(!showNav)}
                /> */}
                <svg className="h-7 w-7 text-gray-700 cursor-pointer" onClick={showDrawer} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="style=linear">
                        <g id="menu-hotdog">
                            <path id="vector" d="M5 6H19" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                            <path id="vector_2" d="M3 12H21" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                            <path id="vector_3" d="M5 18H19" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                        </g>
                    </g>
                </svg>
            </div>

            <Drawer
                placement="left"
                onClose={onClose}
                closable={false}
                open={open}
                width={300}
                bodyStyle={{ padding: "0" }}
                footerStyle={{ position: "fixed" }}
                headerStyle={{ padding: "0", borderBottom: "0" }}
                title={
                    <div className="flex justify-center mt-4 mb-12" >
                        <Image src="/logo.png" width={90} height={90} />
                    </div>
                }
            >


                <div className="flex flex-col gap-y-3 px-2 text-sm">
                    <Link href="/">
                        <div
                            className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/"
                                ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                                : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                                }`}
                        >
                            <Category className="h-5 w-5" variant="Bold" />
                            <p className="">Dashboard</p>
                        </div>
                    </Link>

                    <Link href="/users">
                        <div
                            className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/users"
                                ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                                : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                                }`}
                        >
                            <Profile2User className="h-5 w-5" variant="Bold" />
                            <p className="">Users</p>
                        </div>
                    </Link>

                    <Link href="/hotels">
                        <div
                            className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/hotels"
                                ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                                : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                                }`}
                        >
                            <Buildings2 className="h-5 w-5" variant="Bold" />
                            <p className="">Hotels</p>
                        </div>
                    </Link>

                    <Link href="/bookings">
                        <div
                            className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/bookings"
                                ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                                : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                                }`}
                        >
                            <Calendar className="h-5 w-5" variant="Bold" />
                            <p className="">Bookings</p>
                        </div>
                    </Link>

                    <Link href="/chats">
                        <div
                            className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/chats"
                                ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                                : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                                }`}
                        >
                            <Messages2 className="h-5 w-5" variant="Bold" />
                            <p className="">Chats</p>
                        </div>
                    </Link>

                    <Link href="/notifications">
                        <div
                            className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/notifications"
                                ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                                : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                                }`}
                        >
                            <Notification className="h-5 w-5" variant="Bold" />
                            <p className="">Notifications</p>
                        </div>
                    </Link>

                    <Link href="/settings">
                        <div
                            className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/settings"
                                ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                                : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                                }`}
                        >
                            <Setting2 className="h-5 w-5" variant="Bold" />
                            <p className="">Settings</p>
                        </div>
                    </Link>
                </div>
            </Drawer>

            <div className="flex items-center gap-4 pr-4 md:pr-8">
                <Popover className="relative">
                    <Popover.Button className="outline-none cursor-pointer text-gray-700 hover:text-[#D4AA00] focus:text-[#D4AA00]">
                        <Notification className="h-5 w-5" />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration=75"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                    >
                        <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 bg-white border border-[#E4E4E4] shadow-sm rounded-lg max-w-xs sm:max-w-sm w-screen">
                            <div className="relative p-3 flex flex-col gap-4">
                                {/* <div className="flex justify-between items-center w-full">
                                    <p className="text-[#1a1a1a] font-medium">Notifications</p>
                                    <Link href="/notifications">
                                        <p className="text-sm text-gray-500 hover:underline">
                                            View all
                                        </p>
                                    </Link>
                                </div> */}
                                <div className="grid grid-cols-1 overflow-hidden w-full h-auto gap-3">

                                    <Link href='/notifications'>
                                        <div className='bg:white w-full rounded-md flex items-center gap-2 cursor-pointer border-b pb-2'>
                                            <div className="rounded-full shrink-0 bg-green-200 h-9 w-9 flex items-center justify-center">
                                                <DirectNotification className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className='flex flex-col w-full'>
                                                <p className='text-xs text-[#1a1a1a] hover:text-[#D4AA00] font-medium leading-6'>New Notification</p>
                                                <p className='text-[10px] text-[#636363]'>29 July 2023 - 11:02 PM</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href='/notifications'>
                                        <div className='bg:white w-full rounded-md flex items-center gap-2 cursor-pointer border-b pb-2'>
                                            <div className="rounded-full shrink-0 bg-green-200 h-9 w-9 flex items-center justify-center">
                                                <DirectNotification className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className='flex flex-col w-full'>
                                                <p className='text-xs text-[#1a1a1a] hover:text-[#D4AA00] font-medium leading-6'>New Notification</p>
                                                <p className='text-[10px] text-[#636363]'>29 July 2023 - 11:02 PM</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href='/notifications'>
                                        <div className='bg:white w-full rounded-md flex items-center gap-2 cursor-pointer border-b pb-2'>
                                            <div className="rounded-full shrink-0 bg-green-200 h-9 w-9 flex items-center justify-center">
                                                <DirectNotification className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className='flex flex-col w-full'>
                                                <p className='text-xs text-[#1a1a1a] hover:text-[#D4AA00] font-medium leading-6'>New Notification</p>
                                                <p className='text-[10px] text-[#636363]'>29 July 2023 - 11:02 PM</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href='/notifications'>
                                        <div className='bg:white w-full rounded-md flex items-center gap-2 cursor-pointer border-b pb-2'>
                                            <div className="rounded-full shrink-0 bg-green-200 h-9 w-9 flex items-center justify-center">
                                                <DirectNotification className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className='flex flex-col w-full'>
                                                <p className='text-xs text-[#1a1a1a] hover:text-[#D4AA00] font-medium leading-6'>New Notification</p>
                                                <p className='text-[10px] text-[#636363]'>29 July 2023 - 11:02 PM</p>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center items-center gap-2">
                            <img
                                src="/logo.png"
                                className="bg-gray-200/50 rounded-full object-cover w-8 h-8 border border-yellow-300 shadow-sm"
                                alt="avatar"
                            />
                            {/* <p className="hidden text-left font-medium text-xs text-[#1a1a1a] md:flex md:flex-col">
                                {user && user.fullName}
                                <p className="text-[10px] text-[#636363] font-normal">
                                    Admin
                                </p>
                            </p> */}
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration=75"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white border border-[#E4E4E4] rounded-md shadow-lg">
                            <div className="p-1">
                                {/* <Menu.Item>
                                    <Link
                                        href="#"
                                        className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                                    >
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit
                                    </Link>
                                </Menu.Item> */}
                                <Menu.Item>
                                    <Link
                                        href="/settings"
                                        className="flex hover:bg-[#FFF7D8] hover:text-[#D4AA00] text-[#636363] rounded-lg p-2 text-sm group transition-colors items-center"
                                    >
                                        <Setting2 className="h-4 w-4 mr-2" variant="Bold" />
                                        Settings
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link
                                        href="#"
                                        className="flex hover:bg-red-500 hover:text-white text-[#636363] rounded-lg p-2 text-sm group transition-colors items-center"
                                        onClick={logOut}
                                    >
                                        <LogoutCurve className="h-4 w-4 mr-2" variant="Bold" />
                                        Log Out
                                    </Link>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}