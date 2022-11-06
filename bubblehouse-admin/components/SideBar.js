import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

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
                        {SidebarData && SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;