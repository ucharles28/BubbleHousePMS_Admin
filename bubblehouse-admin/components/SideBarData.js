import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { Home2 } from 'iconsax-react';
import { ArrowRight2 } from 'iconsax-react';
import { ArrowDown2 } from 'iconsax-react';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/overview',
    icon: <Home2 size="16" color="#1a1a1a"/>,
    iconClosed: <ArrowRight2 size="14" color="#1a1a1a" />,
    iconOpened: <ArrowDown2 size="14" color="#1a1a1a" />,

    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Manage Users',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
     iconClosed: <ArrowRight2 size="14" color="#1a1a1a" />,
    iconOpened: <ArrowDown2 size="14" color="#1a1a1a" />,

    subNav: [
      {
        title: 'Reports',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 2',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 3',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

     iconClosed: <ArrowRight2 size="14" color="#1a1a1a" />,
    iconOpened: <ArrowDown2 size="14" color="#1a1a1a" />,

    subNav: [
      {
        title: 'Message 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];