import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { breakpointDown, Actions, Select, LayoutHeader, EvaIcon } from 'oah-ui';

const SidebarIcon = styled(Actions)`
  display: none;
  div {
    height: auto;
  }
  ${breakpointDown('md')`
    display: flex;
  `}
`;

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .logo {
    margin-left: 0;
    display: flex;
    align-items: center;
    height: 35px;
    img {
      margin-right: 10px;
      height: 100%;
    }
  }
  .left {
    display: flex;
    align-items: center;
    width: 100%;
  }
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
`;
interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
}

const SelectStyled = styled(Select)`
  min-width: 150px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
`;
const Header: React.FC<HeaderProps> = (props) => {
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
        <div className="left">
          <SidebarIcon
            size="Medium"
            actions={[
              {
                icon: 'menu-2-outline',
                url: {
                  onClick: props.toggleSidebar,
                },
              },
            ]}
          />
          <Actions
            size="Medium"
            actions={[
              {
                content: (
                  <div className="logo">
                    <img src="/icons/icon-48x48.png" /> Prisma Tools
                  </div>
                ),
              },
              {
                content: (
                  <SelectStyled
                    isSearchable={false}
                    shape="SemiRound"
                    placeholder="Themes"
                    value={themeOptions.find((item) => item.value === props.theme.value)}
                    options={themeOptions}
                    onChange={({ value }: { value: DefaultTheme['name'] }) => props.theme.set(value)}
                  />
                ),
              },
            ]}
          />
        </div>
        <Actions
          size="Small"
          className="right"
          actions={[
            {
              icon: 'github',
              url: { href: 'https://github.com/paljs/prisma', target: '_blank' },
            },
            {
              icon: 'twitter',
              url: { href: 'https://twitter.com/AhmedElywh', target: '_blank' },
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};

export default Header;
