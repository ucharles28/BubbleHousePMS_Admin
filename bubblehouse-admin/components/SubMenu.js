import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const SidebarLink = styled.a`
  display: flex;
  color: #1a1a1a;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  list-style: none;
  height: 49px;
  text-decoration: none;
  font-size: 14px;
  line-height: 24;
  font-weight: 400;
  margin-right: 17px;
  margin-left: 7px;

  &:hover {
    background: #1a1a1a1a;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 10px;
`;

const DropdownLink = styled.a`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 14px;
  line-height: 24;
  font-weight: 400;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <Link href={item.subNav ? '#' : item.path} onClick={item.subNav && showSubnav}>
                <SidebarLink>
                    <div className='flex items-center justify-center'>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </div>
                    <div>
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                                ? item.iconClosed
                                : null}
                    </div>
                </SidebarLink>
            </Link>
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <Link href={item.path} key={index}>
                            <DropdownLink>
                                {item.icon}
                                <SidebarLabel>{item.title}</SidebarLabel>
                            </DropdownLink>
                        </Link>
                    );
                })}
        </>
    );
};

export default SubMenu;