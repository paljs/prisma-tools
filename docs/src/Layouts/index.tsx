import React, { useState, useRef, Fragment, useEffect } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import icons from 'oah-eva-icon';
import themes from './themes';
import { Layout, LayoutContent, LayoutContainer, LayoutColumns, LayoutColumn, SidebarRefObject } from 'oah-ui';

import Header from './Header';
import SimpleLayout from './SimpleLayout';
import SidebarCustom from './Sidebar';

const getDefaultTheme = (): DefaultTheme['name'] => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as DefaultTheme['name'];
  } else {
    const hours = new Date().getHours();
    return hours > 6 && hours < 19 ? 'default' : 'dark';
  }
};

const LayoutPage: React.FC = (props) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('default');
  const sidebarRef = useRef<SidebarRefObject>(null);

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
    typeof localStorage !== 'undefined' && localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const localTheme = getDefaultTheme();
    if (localTheme !== theme && theme === 'default') {
      setTheme(localTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={themes(theme)}>
      <Fragment>
        <SimpleLayout />
        <Layout windowMode evaIcons={icons}>
          <Header theme={{ set: changeTheme, value: theme }} toggleSidebar={() => sidebarRef.current?.toggle()} />
          <LayoutContainer>
            <SidebarCustom ref={sidebarRef} />
            <LayoutContent>
              <LayoutColumns>
                <LayoutColumn className="main-content">{props.children}</LayoutColumn>
              </LayoutColumns>
            </LayoutContent>
          </LayoutContainer>
        </Layout>
      </Fragment>
    </ThemeProvider>
  );
};

export default LayoutPage;
