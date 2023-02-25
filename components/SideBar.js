// import Image from 'next/image';
// import logo from '../public/logo.png'
// import Link from 'next/link';
// import React, { useState, useMemo } from "react";
// import { useRouter } from "next/router";
// import classNames from "classnames";
// import { BiSupport } from 'react-icons/bi';
// import { HiMenuAlt3, HiOutlineUsers } from "react-icons/hi";
// import { MdOutlineDashboard, MdOutlineManageAccounts, MdPayment } from "react-icons/md";
// import { RiSettings4Line, RiLogoutCircleLine, RiArrowDownSLine } from "react-icons/ri";

// function Sidebar() {

//     const menuItems = [
//         { id: 1, key: 1, label: "Dashboard", icon: MdOutlineDashboard, link: "/", margin: true },
//         {
//             id: 2,
//             key: 2,
//             label: "Manage Users",
//             icon: HiOutlineUsers,
//             link: "/users",
//             subMenus: [
//                 {
//                     label: 'Add Admin',
//                     link: "/users",
//                 },
//                 {
//                     label: 'All Users',
//                     link: "/users/new",
//                 },
//             ],
//         },
//         { id: 3, key: 3, label: "Manage Payment", icon: MdPayment, link: "/rooms" },
//         { id: 4, key: 4, label: "Setting", icon: RiSettings4Line, link: "/hotels" },
//     ];

//     const [toggleCollapse, setToggleCollapse] = useState(false);
//     const [isCollapsible, setIsCollapsible] = useState(false);
//     const [subMenuOpen, setSubMenuOpen] = useState(false);
//     const [subMenuOpenObj, setSubMenuOpenObj] = useState({});

//     const router = useRouter();

//     const activeMenu = useMemo(
//         () => {
//             if (router.pathname === '/') {
//                 return menuItems[0]
//             }
//             const item = menuItems.find((menu) => router.pathname.startsWith(menu.link) && menu.link !== '/')
//             return item
//         },
//         [router.pathname]
//     );

//     const wrapperClasses = classNames(
//         "h-screen px-3 pb-3 bg-white flex justify-between flex-col border-r shadow",
//         {
//             ["lg:w-72 w-60"]: !toggleCollapse,
//             ["lg:w-16 w-14 pt-6 pb-3 justify-center flex"]: toggleCollapse,
//         }
//     );

//     const collapseIconClasses = classNames(
//         "justify-end items-center flex absolute right-0 cursor-pointer text-gray-900",
//     );

//     const getNavItemClasses = (menu) => {

//         return classNames(
//             "flex items-center cursor-pointer hover:text-purple-1000 rounded-md w-full overflow-hidden whitespace-nowrap",
//             {
//                 ["text-purple-1000 "]: activeMenu.id === menu.id,
//             }
//         );
//     };

//     const toggleSubMenu = (index) => {
//         const obj = { ...subMenuOpenObj }
//         obj[index] = !obj[index]
//         setSubMenuOpenObj(obj)
//     }

//     const handleSidebarToggle = () => {
//         setToggleCollapse(!toggleCollapse);
//     };


//     return (
//         <div
//             className={wrapperClasses}
//             style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
//         >
//             <div className="flex flex-col">
//                 <div className="pt-6 pb-4 flex items-center m-0 justify-between relative">
//                     {!toggleCollapse && (
//                         <Link href="/" >
//                             <a className="inline-flex items-center">

//                                 <span className='w-24 flex'><Image src={logo} alt='Bcloud' /></span>

//                             </a>
//                         </Link>
//                     )}

//                     <HiMenuAlt3
//                         size={26}
//                         className={collapseIconClasses}
//                         onClick={handleSidebarToggle}
//                     />
//                 </div>

//                 <div className="mt-4 flex flex-col h-full gap-3 ">
//                     {menuItems.map(({ icon: Icon, ...menu }, index) => {
//                         const classes = getNavItemClasses(menu);
//                         return (
//                             <div className={classes}>

//                                 <div className='w-full'>
//                                     <div className='group flex items-center justify-between w-full px-4'>

//                                         <Link href={menu.link} className="hover:text-[#A259FF]">
//                                             <a className="w-full h-full rounded-lg py-3">
//                                                 <div className='flex items-center w-full'>
//                                                     <div style={{ width: "2.5rem" }} >
//                                                         <Icon className='group-hover:text-purple-1000 flex items-center' />
//                                                     </div>
//                                                     {!toggleCollapse && (
//                                                         <p
//                                                             className={classNames(
//                                                                 "text-sm font-normal group-hover:text-purple-1000 flex items-center"
//                                                             )}
//                                                         >
//                                                             {menu.label}
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             </a>
//                                         </Link>

//                                         {menu.subMenus && (
//                                             <RiArrowDownSLine
//                                                 size={20}
//                                                 onClick={() => toggleSubMenu(index)}
//                                                 className={`${subMenuOpen && 'w-full rotate-180 text-white hover:text-white'}`}
//                                             />
//                                         )}

//                                     </div>

//                                     <div>
//                                         {menu.subMenus && subMenuOpenObj[index] && open && (
//                                             <ul className='block pl-8 pr-4 pb-3 w-full group'>
//                                                 {menu.subMenus.map((subMenuItem, idx) => (

//                                                     <Link href={subMenuItem.link} className="hover:text-[#A259FF]" >
//                                                         <li
//                                                             key={idx}
//                                                             className="text-gray-900 hover:text-[#A259FF] text-sm font-normal flex items-center gap-x-2 cursor-pointer p-2 px-5 rounded-lg w-full"
//                                                         >
//                                                             {subMenuItem.label}
//                                                         </li>
//                                                     </Link>

//                                                 ))}
//                                             </ul>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//             </div >

//             <div className={`${getNavItemClasses({})} px-4 py-3 hover:text-[#fff] hover:bg-[#ce000e]`}
//             >
//                 <div style={{ width: "2.5rem" }}>
//                     <RiLogoutCircleLine />
//                 </div>
//                 {!toggleCollapse && (
//                     <span className={classNames("text-sm font-normal")}>
//                         Logout
//                     </span>
//                 )}
//             </div>
//         </div >
//     );
// };

// export default Sidebar;

import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';
import { Home2, Setting2, Profile2User, Notification, Buildings2, Notepad2, Calendar, Note, Messages2 } from 'iconsax-react';

const SideBar = forwardRef(({ showNav }, ref) => {
    const router = useRouter();

    return (
        <div ref={ref} className="fixed z-20 w-72 h-full bg-white shadow-sm border-dashed border-r-[1.5px] border-[#E4E4E4]">
            <div className="flex justify-center mt-4 mb-14">
                <Image src="/logo.png" width={110} height={110} />
            </div>

            <div className="flex flex-col gap-y-3 px-2">
                <Link href="/dashboard">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/dashboard"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Home2 className="h-5 w-5" variant="Bold" />
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

                <Link href="/rooms">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/rooms"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Calendar className="h-5 w-5" variant="Bold" />
                        <p className="">Bookings</p>
                    </div>
                </Link>

                <Link href="/dashboard">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/oard"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Notepad2 className="h-5 w-5" variant="Bold" />
                        <p className="">Book room</p>
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

                <Link href="/dashboard">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/oard"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Setting2 className="h-5 w-5" variant="Bold" />
                        <p className="">Settings</p>
                    </div>
                </Link>
            </div>
        </div>
    );
});

SideBar.displayName = "SideBar";

export default SideBar;