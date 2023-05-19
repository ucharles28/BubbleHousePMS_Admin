import { forwardRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image';
import Cookies from 'universal-cookie';
import logo from '../public/logo.png'
import { Setting2, Profile2User, Notification, Buildings2, Calendar, Messages2, Category, LogoutCurve, Money2 } from 'iconsax-react';

const SideBar = forwardRef(({ showNav }, ref) => {
    const logOut = () => {
        localStorage.setItem('user', null)
        const cookies = new Cookies();
        cookies.remove('bcloudCookie');
        router.push('/login');
    }
    const router = useRouter();
    const [box5, setBox5] = useState(false);

    // keep router.pathname alive when in sub pages
    if (router.pathname.includes("/users")) {
        router.pathname = "/users";
    } else if (router.pathname.includes("/hotels")) {
        router.pathname = "/hotels";
    } else if (router.pathname.includes("/bookings")) {
        router.pathname = "/bookings";
    } else if (router.pathname.includes("/rewards")) {
        router.pathname = "/rewards";
    } else if (router.pathname.includes("/chats")) {
        router.pathname = "/chats";
    } else if (router.pathname.includes("/notifications")) {
        router.pathname = "/notifications";
    } else if (router.pathname.includes("/settings")) {
        router.pathname = "/settings";
    } else {
        router.pathname = "/";
    } 

    return (
        <div ref={ref} className="md:flex hidden flex-col fixed z-20 w-72 h-full bg-white shadow-sm border-dashed border-r-[1.5px] border-[#E4E4E4]">
            <div className="flex justify-center mt-4 mb-14">
                <Image src={logo} width={100} height={100} />
            </div>

            <div className="flex flex-col gap-y-2 px-2 text-sm">
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

                <Link
                    href="/users"
                // onClick={() => setBox5(!box5)}
                >
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

                {/* {box5 && (
                    <div className="bg-[#ffcc00]/20 rounded-md flex flex-col gap-2 text-sm font-normal leading-5">
                        <p>All Users </p>
                        <p>All Users </p>
                        <p>All Users </p>
                        <p>All Users </p>
                    </div>)} */}

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

                <Link href="/rewards">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/rewards"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Money2 className="h-5 w-5" variant="Bold" />
                        <p className="">Rewards</p>
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
                        <p className="">Messages</p>
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

                <Link href="/#">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${router.pathname == "/#"
                            ? "bg-red-500 text-white rounded-xl"
                            : "text-[#636363] hover:bg-red-500 hover:text-white rounded-xl"
                            }`}
                        onClick={logOut}
                    >
                        <LogoutCurve className="h-5 w-5" variant="Bold" />
                        <p className="">Log Out</p>
                    </div>
                </Link>

            </div>
        </div>
    );
});

SideBar.displayName = "SideBar";

export default SideBar;