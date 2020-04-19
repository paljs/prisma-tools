import { createTheme } from 'oah-ui';
import { DefaultTheme } from 'styled-components';

const shared: Partial<DefaultTheme> = {
  sidebarHeaderGap: '2rem',
  fontFamilyPrimary: `-apple-system,BlinkMacSystemFont,
          "Segoe UI",Roboto,"Helvetica Neue",
          Arial,sans-serif,"Apple Color Emoji",
          "Segoe UI Emoji","Segoe UI Symbol"`,
};

export default function themeService(theme: DefaultTheme['name'], dir: 'ltr' | 'rtl') {
  switch (theme) {
    case 'dark':
    case 'cosmic':
    case 'corporate':
    default:
      return createTheme(theme, { dir, ...shared });
  }
}
