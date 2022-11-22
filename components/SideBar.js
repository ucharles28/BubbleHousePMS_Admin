import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
// import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import Image from "next/image";

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { Home2, People, Buildings, ArrowRight2, ArrowDown2, Calendar, Book, Notification, Setting2 } from 'iconsax-react';

const Nav = styled.div`
  background: #F4F5FA;
  border-bottom-width: 1.5px;
  height: 64px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 250px
`;

const NavIcon = styled.a`
  margin-left: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #F4F5FA;
  border-right-width: 1.5px;
  width: 260px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  /* left: ${({ sidebar }) => (sidebar ? '0' : '-100%')}; */
  left: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Home2 size="16" color="#1a1a1a" />
  },
  {
    title: 'Manage Users',
    path: '#',
    icon: <People size="16" color="#1a1a1a" />,
    iconClosed: <ArrowRight2 size="14" color="#1a1a1a" />,
    iconOpened: <ArrowDown2 size="14" color="#1a1a1a" />,

    subNav: [
      {
        title: 'Add User',
        path: '/users/new',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'All Users',
        path: '/users',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },

    ]
  },
  {
    title: 'Manage Hotels',
    path: '#',
    icon: <Buildings size="16" color="#1a1a1a" />,
    iconClosed: <ArrowRight2 size="14" color="#1a1a1a" />,
    iconOpened: <ArrowDown2 size="14" color="#1a1a1a" />,

    subNav: [
      {
        title: 'Add Hotel',
        path: '/hotels/new',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'All Hotels',
        path: '/hotels',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Add Room Type',
        path: '/roomtypes/new',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'All Room Types',
        path: '/roomtype',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Add Room',
        path: '/rooms/new',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'All Rooms',
        path: '/rooms',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },

    ]
  }
  // {
  //   title: 'Manage Bookings',
  //   path: '#',
  //   icon: <Calendar size="16" color="#1a1a1a" />,
  //   iconClosed: <ArrowRight2 size="14" color="#1a1a1a" />,
  //   iconOpened: <ArrowDown2 size="14" color="#1a1a1a" />,

  //   subNav: [
  //     {
  //       title: 'Booking Request',
  //       path: '#',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Todays Booked',
  //       path: '#',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },

  //   ]
  // },
  // {
  //   title: 'Book Room',
  //   path: '#',
  //   icon: <Book size="16" color="#1a1a1a" />
  // },
  // {
  //   title: 'Notification',
  //   path: '#',
  //   icon: <Notification size="16" color="#1a1a1a" />
  // },
  // {
  //   title: 'Settings',
  //   path: '#',
  //   icon: <Setting2 size="16" color="#1a1a1a" />
  // },

];



const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#' }}>
                <Nav>
                    <Link href='#' className='hidden'>
                        <NavIcon>
                            <FaBars onClick={showSidebar} />
                        </NavIcon>
                    </Link>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <Link href='#' className='hidden'>
                            <NavIcon>
                                <AiOutlineClose onClick={showSidebar} />
                            </NavIcon>
                        </Link>
                        <Image src="/logo.png" width={120} height={120} className="mb-6 ml-6" />

                        {SidebarData && SidebarData.map((item, index) => {
                            return (<SubMenu item={item} key={index} />);
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;