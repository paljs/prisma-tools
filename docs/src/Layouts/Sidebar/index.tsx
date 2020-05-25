import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Menu, SidebarBody, Button, SidebarRefObject, MenuRefObject, EvaIcon, SidebarProps, Sidebar } from 'oah-ui';
import menuItems from '../menuItem';
import { Link } from 'gatsby';
import { Location } from '@reach/router';

const getPathReady = (path: string) => {
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

const SidebarCustom: React.RefForwardingComponent<Omit<SidebarRefObject, 'hide'>, SidebarProps> = (_, ref) => {
  const [menuState, setMenuState] = useState(false);
  const sidebarRef = useRef<SidebarRefObject>(null);
  const menuRef = useRef<MenuRefObject>(null);

  useImperativeHandle(ref, () => ({
    toggle() {
      sidebarRef.current?.toggle();
    },
  }));

  return (
    <Sidebar
      ref={sidebarRef}
      property="start"
      containerFixed
      responsive
      className="menu-sidebar"
      compactedBreakpoints={[]}
      hiddenBreakpoints={['xs', 'is', 'sm', 'md']}
    >
      <header>
        <Button
          size="Tiny"
          status="Primary"
          onClick={() => {
            setMenuState(!menuState);
            menuRef.current?.toggle();
          }}
          fullWidth
        >
          {menuState ? <EvaIcon name="arrow-circle-up" /> : <EvaIcon name="arrow-circle-down" />}
        </Button>
      </header>
      <SidebarBody>
        <Location>
          {({ location }) => (
            <Menu
              className="sidebar-menu"
              Link={Link}
              ref={menuRef}
              items={menuItems}
              currentPath={getPathReady(location.pathname)}
              toggleSidebar={() => sidebarRef.current?.hide()}
            />
          )}
        </Location>
      </SidebarBody>
    </Sidebar>
  );
};

export default forwardRef(SidebarCustom);
