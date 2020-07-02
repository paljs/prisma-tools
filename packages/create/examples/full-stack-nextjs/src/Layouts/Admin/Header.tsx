import React, { useContext } from 'react';
import Link from 'next/link';
import styled, { DefaultTheme } from 'styled-components';
import Select from '@paljs/ui/Select';
import { LayoutHeader } from '@paljs/ui/Layout';
import { EvaIcon } from '@paljs/ui/Icon';
import { breakpointDown } from '@paljs/ui/breakpoints';
import { Actions } from '@paljs/ui/Actions';
import User from '@paljs/ui/User';
import { LayoutContext } from './index';
import { useApolloClient } from '@apollo/client';
import { useLogoutMutation } from 'generated';

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
  theme: DefaultTheme['name'];
}

const Header: React.FC<HeaderProps> = (props) => {
  const { me, refetch } = useContext(LayoutContext);
  const [logoutMutation] = useLogoutMutation();
  const client = useApolloClient();

  const logout = async () => {
    await logoutMutation();
    await client.clearStore();
    refetch && (await refetch());
  };

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
                <Link href="/admin">
                  <a className="logo">Prisma Admin</a>
                </Link>
              ),
            },
            {
              content: (
                <SelectStyled
                  isSearchable={false}
                  shape="SemiRound"
                  placeholder="Themes"
                  value={themeOptions.find((item) => item.value === props.theme)}
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
              url: { href: 'https://github.com/paljs', target: '_blank' },
            },
            {
              icon: 'twitter',
              url: { href: 'https://twitter.com/AhmedElywh', target: '_blank' },
            },
            {
              content: me && <User name={me.name!} title="Manager" size="Medium" />,
            },
            {
              icon: { name: 'log-out-outline', options: { animation: { type: 'zoom' } } },
              url: {
                onClick: logout,
                title: 'Log out',
              },
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
