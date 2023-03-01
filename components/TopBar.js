import { Fragment, useEffect, useState } from "react";
import { Notification, ArrowDown2, HambergerMenu, DirectNotification, Edit2, Setting2 } from 'iconsax-react';
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";

export default function TopBar({ showNav, setShowNav }) {
    const [user, setUser] = useState()
    useEffect(() => {
      
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return (
        <div
            className={`bg-white z-10 border-b-[1.5px] border-[#E4E4E4] fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-72" : ""
                }`}
        >
            <div className="pl-4 md:pl-6">
                {/* <HambergerMenu
                    className="h-7 w-7 text-gray-700 cursor-pointer"
                    onClick={() => setShowNav(!showNav)}
                /> */}
                <svg className="h-7 w-7 text-gray-700 cursor-pointer" onClick={() => setShowNav(!showNav)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="style=linear">
                        <g id="menu-hotdog">
                            <path id="vector" d="M5 6H19" stroke="#1A1A1A" strokeWidth="1.5" stroke-linecap="round" />
                            <path id="vector_2" d="M3 12H21" stroke="#1A1A1A" strokeWidth="1.5" stroke-linecap="round" />
                            <path id="vector_3" d="M5 18H19" stroke="#1A1A1A" strokeWidth="1.5" stroke-linecap="round" />
                        </g>
                    </g>
                </svg>
            </div>
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
                        <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 bg-white border border-[#E4E4E4] shadow-sm rounded-md max-w-xs sm:max-w-sm w-screen">
                            <div className="relative p-3 flex flex-col gap-4">
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-[#1a1a1a] font-medium">Notifications</p>
                                    <Link href="/notifications">
                                        <p className="text-sm text-gray-500 hover:underline">
                                            View all
                                        </p>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 overflow-hidden w-full h-auto gap-3">

                                    <Link href='/notifications'>
                                        <div className='bg:white w-full rounded-md flex items-start gap-2 cursor-pointer'>
                                            <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                                <DirectNotification className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className='flex flex-col w-full '>
                                                <p className='text-sm text-[#1a1a1a] hover:text-[#D4AA00] font-medium italic leading-6'>New Notification</p>
                                                <p className='text-xs text-[#636363] leading-5'>Ipsum ad pariatur voluptate elit sunt.</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href='/notifications'>
                                        <div className='bg:white w-full rounded-md flex items-start gap-2 cursor-pointer'>
                                            <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                                <DirectNotification className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className='flex flex-col w-full '>
                                                <p className='text-sm text-[#1a1a1a] hover:text-[#D4AA00] font-medium italic leading-6'>New Notification</p>
                                                <p className='text-xs text-[#636363] leading-5'>Ipsum ad pariatur voluptate elit sunt.</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href='/notifications'>
                                        <div className='bg:white w-full rounded-md flex items-start gap-2 cursor-pointer'>
                                            <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                                <DirectNotification className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className='flex flex-col w-full '>
                                                <p className='text-sm text-[#1a1a1a] hover:text-[#D4AA00] font-medium italic leading-6'>New Notification</p>
                                                <p className='text-xs text-[#636363] leading-5'>Ipsum ad pariatur voluptate elit sunt.</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href='/notifications'>
                                        <div className='bg:white w-full rounded-md flex items-start gap-2 cursor-pointer'>
                                            <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                                <DirectNotification className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div className='flex flex-col w-full '>
                                                <p className='text-sm text-[#1a1a1a] hover:text-[#D4AA00] font-medium italic leading-6'>New Notification</p>
                                                <p className='text-xs text-[#636363] leading-5'>Ipsum ad pariatur voluptate elit sunt.</p>
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
                                className="rounded-full object-cover w-9 h-9 border border-yellow-300 shadow-sm"
                                alt="avatar"
                            />
                            <p className="hidden text-left font-medium text-sm text-[#1a1a1a] md:flex md:flex-col">
                                {user && user.fullName}
                                <p className="text-xs text-[#636363] font-normal">
                                    Admin
                                </p>
                                {/* <ArrowDown2 className="h-4 w-4 text-gray-800" /> */}
                            </p>
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
                        <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white border border-[#E4E4E4] rounded-md shadow-sm">
                            <div className="p-1">
                                <Menu.Item>
                                    <Link
                                        href="#"
                                        className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                                    >
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link
                                        href="#"
                                        className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                                    >
                                        <Setting2 className="h-4 w-4 mr-2" />
                                        Settings
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