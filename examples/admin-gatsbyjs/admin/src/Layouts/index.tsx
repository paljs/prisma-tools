import React, { useRef, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from './themes';
import {
  Layout,
  LayoutContent,
  LayoutContainer,
  LayoutColumns,
  LayoutColumn,
  SidebarBody,
  Menu,
  Sidebar,
  SidebarRefObject,
  MenuRefObject,
} from 'oah-ui';
import icons from 'oah-eva-icon';

import Header from './Header';
import SimpleLayout from './SimpleLayout';
import { Location } from '@reach/router';
import { Link } from 'gatsby';
import menuItems from './menuItem';
import { EnumFragment, ModelFragment, useGetSchemaQuery } from '../generated';

export const getPathReady = (path: string) => {
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

interface ContextProps {
  schema: {
    models: ModelFragment[];
    enums: EnumFragment[];
  };
  children?: React.ReactNode;
}

const initialContext: ContextProps = {
  schema: {
    models: [],
    enums: [],
  },
};

export const LayoutContext: React.Context<ContextProps> = React.createContext(initialContext);

const LayoutPage: React.FC<{ pageContext: { layout: string } }> = ({ children, pageContext }) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('dark');
  const sidebarRef = useRef<SidebarRefObject>(null);
  const menuRef = useRef<MenuRefObject>(null);
  const { data } = useGetSchemaQuery();

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
  };

  return (
    <ThemeProvider theme={themes(theme)}>
      <LayoutContext.Provider
        value={{
          schema: data?.getSchema ?? {
            models: [],
            enums: [],
          },
        }}
      >
        <SimpleLayout />
        <Layout evaIcons={icons} className={pageContext.layout === 'auth' ? 'auth-layout' : ''}>
          {pageContext.layout !== 'auth' && (
            <Header changeTheme={changeTheme} toggleSidebar={() => sidebarRef.current?.toggle()} />
          )}
          <LayoutContainer>
            {pageContext.layout !== 'auth' && (
              <Sidebar ref={sidebarRef} property="start" containerFixed responsive className="menu-sidebar">
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
            )}
            <LayoutContent>
              <LayoutColumns>
                <LayoutColumn className="main-content">{children}</LayoutColumn>
              </LayoutColumns>
            </LayoutContent>
          </LayoutContainer>
        </Layout>
      </LayoutContext.Provider>
    </ThemeProvider>
  );
};

export default LayoutPage;
