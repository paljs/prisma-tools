import { createTheme } from '@paljs/theme';
import { DefaultTheme } from 'styled-components';

const shared: Partial<DefaultTheme> = {
  cardScrollbarWidth: '0.6rem',
  sidebarHeaderGap: '2rem',
  fontFamilyPrimary: `-apple-system,BlinkMacSystemFont,
          "Segoe UI",Roboto,"Helvetica Neue",
          Arial,sans-serif,"Apple Color Emoji",
          "Segoe UI Emoji","Segoe UI Symbol"`,
};

export default function themeService(theme: DefaultTheme['name']) {
  switch (theme) {
    case 'corporate':
    case 'dark':
    case 'cosmic':
    default:
      return createTheme(theme, shared);
  }
}
