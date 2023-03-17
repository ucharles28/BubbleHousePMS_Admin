// import React from "react";
// import Sidebar from "./SideBar";
// import Link from 'next/link';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Dashboard from "../pages/dashboard";
// import Users from "../pages/users/index";

// const Layout = ({ children }) => {

//   return (
//     <div className="h-screen flex flex-row justify-start font-inter">
//       <Sidebar />

//       <div className="item w-full h-full bg-gray-100/50 flex-1 flex-col justify-between overflow-y-scroll scroll-smooth scrollbar-thumb-gray-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">

//         <div className="flex flex-col px-6 py-2 w-full border-b bg-gray-100/50 border-gray-300">
//           <div className="flex items-center justify-end">

//             <Link href="/settings">
//               <a className="block relative justify-end">
//                 <img src='https://africavo.s3.eu-west-2.amazonaws.com/avatar%20(1).png' alt="avatar" className="mx-auto object-cover rounded-full h-10 w-10 shadow-sm border-2 border-purple-500" />
//               </a>
//             </Link>

//           </div>
//         </div>

//         <div className="item w-full h-full bg-gray-100/50 p-2 flex-1 overflow-y-scroll scroll-smooth scrollbar-thumb-gray-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-2">

//           {children}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Layout;

import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen flex flex-row justify-start ">

      <div className="w-full h-full flex-1 flex-col justify-between ">
        <TopBar showNav={showNav} setShowNav={setShowNav} />
        <main
          className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "md:pl-72" : ""
            }`}
        >
          <div className="px-4 bg-[#f6f6f6] min-h-screen">
            {children}
          </div>
        </main>
      </div>

      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} />
      </Transition>
    </div>
  );
}