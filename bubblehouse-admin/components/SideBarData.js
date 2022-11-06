import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { Home2, People } from 'iconsax-react';
import { ArrowRight2 } from 'iconsax-react';
import { ArrowDown2 } from 'iconsax-react';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Home2 size="16" color="#1a1a1a"/>
  },
  {
    title: 'Manage Users',
    path: '/users',
    icon: <People size="16"/>,
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
    path: '/hotels',
    icon: <People size="16"/>,
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
      
    ]
  },
  {
    title: 'Manage Bookings',
    path: '#',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Book Room',
    path: '#',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Notification',
    path: '#',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Settings',
    path: '#',
    icon: <FaIcons.FaCartPlus />
  },
  
];