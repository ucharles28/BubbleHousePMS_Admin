import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';
import { Setting2, Profile2User, Notification, Buildings2, Note, Calendar, Messages2, Category } from 'iconsax-react';

const SideBar = forwardRef(({ showNav }, ref) => {
    const router = useRouter();

    return (
        <div ref={ref} className="md:flex hidden flex-col fixed z-20 w-72 h-full bg-white shadow-sm border-dashed border-r-[1.5px] border-[#E4E4E4]">
            <div className="flex justify-center mt-4 mb-14">
                <Image src="/logo.png" width={100} height={100} />
            </div>

            <div className="flex flex-col gap-y-3 px-2">
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

                {/* <Link href="/dashboard">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/oard"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Notepad2 className="h-5 w-5" variant="Bold" />
                        <p className="">Book room</p>
                    </div>
                </Link> */}

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
        </div>
    );
});

SideBar.displayName = "SideBar";

export default SideBar;