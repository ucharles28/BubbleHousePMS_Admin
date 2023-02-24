import { Fragment } from "react";
import { Notification, ArrowDown2, HambergerMenu, DirectNotification, Edit2, Setting2 } from 'iconsax-react';
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";

export default function TopBar({ showNav, setShowNav }) {
    return (
        <div
            className={`bg-white z-10 border-b-[1.5px] border-[#E4E4E4] fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-72" : ""
                }`}
        >
            <div className="pl-4 md:pl-8">
                <HambergerMenu
                    className="h-7 w-7 text-gray-700 cursor-pointer"
                    onClick={() => setShowNav(!showNav)}
                />
            </div>
            <div className="flex items-center gap-4 pr-4 md:pr-8">
                <Popover className="relative">
                    <Popover.Button className="outline-none cursor-pointer text-gray-700 hover:text-[#D4AA00] focus:text-[#D4AA00]">
                        <Notification className="h-6 w-6" />
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
                            <div className="relative p-3">
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-gray-700 font-medium">Notifications</p>
                                    <Link href="/notifications">
                                        <p className="text-sm text-gray-500 hover:underline">
                                            View all
                                        </p>
                                    </Link>
                                </div>
                                <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                                    <div className="flex">
                                        <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                            <DirectNotification className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-700">
                                                Notification Title
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Test Notification text for design
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                            <DirectNotification className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-700">
                                                Notification Title
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Test Notification text for design
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                            <DirectNotification className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-700">
                                                Notification Title
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Test Notification text for design
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                            <DirectNotification className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-700">
                                                Notification Title
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Test Notification text for design
                                            </p>
                                        </div>
                                    </div>
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
                                className="rounded-full object-cover w-8 h-8 border border-yellow-300 shadow-sm"
                                alt="avatar"
                            />
                            <p className="hidden md:block font-medium text-gray-700 gap-1 md:flex items-center">
                                Super Admin
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