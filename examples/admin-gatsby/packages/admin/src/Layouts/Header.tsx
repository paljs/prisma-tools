import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled, { DefaultTheme } from 'styled-components';
import { Actions, Select, LayoutHeader, User, ContextMenu, breakpointDown, EvaIcon } from 'oah-ui';
import { Location } from '@reach/router';
import { getPathReady, LayoutContext } from './index';

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
`;

const SelectStyled = styled(Select)`
  min-width: 150px;
`;

interface HeaderProps {
  toggleSidebar: () => void;
  changeTheme: (value: DefaultTheme['name']) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { me } = useContext(LayoutContext);
  const themeOptions = [
    {
      value: 'default',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#a6c1ff' }} />
          Default
        </Label>
      ),
    },
    {
      value: 'dark',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#192038' }} />
          Dark
        </Label>
      ),
    },
    {
      value: 'cosmic',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#5a37b8' }} />
          Cosmic
        </Label>
      ),
    },
    {
      value: 'corporate',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#3366ff' }} />
          Corporate
        </Label>
      ),
      selected: true,
    },
  ];
  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link to="/" className="logo">
                  Prisma Admin
                </Link>
              ),
            },
            {
              content: (
                <SelectStyled
                  isSearchable={false}
                  shape="SemiRound"
                  placeholder="Themes"
                  options={themeOptions}
                  onChange={({ value }: { value: DefaultTheme['name'] }) => props.changeTheme(value)}
                />
              ),
            },
          ]}
        />
        <Actions
          size="Small"
          className="right"
          actions={[
            {
              icon: 'github',
              url: { href: 'https://github.com/AhmedElywa/prisma-tools', target: '_blank' },
            },
            {
              icon: 'twitter',
              url: { href: 'https://twitter.com/AhmedElywh', target: '_blank' },
            },
            {
              content: (
                <Location>
                  {({ location }) => (
                    <ContextMenu
                      style={{ cursor: 'pointer' }}
                      placement="bottom"
                      currentPath={getPathReady(location.pathname)}
                      items={[
                        { title: 'Profile', link: { to: '/dashboard' } },
                        { title: 'Log out', link: { to: '/logout' } },
                      ]}
                      Link={Link}
                    >
                      <User image="url('/icons/icon-72x72.png')" name={me?.name} title="Manager" size="Medium" />
                    </ContextMenu>
                  )}
                </Location>
              ),
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
