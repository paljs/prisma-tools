import { createTheme } from 'oah-ui';
import { DefaultTheme } from 'styled-components';

const shared: Partial<DefaultTheme> = {
  sidebarHeaderGap: '2rem',
  gridSize: 12,
  textHeading2FontSize: '1.5rem',
  textHeading3FontSize: '1.25rem',
  textHeading4FontSize: '1rem',
  textHeading5FontSize: '.75rem',
  fontFamilyPrimary: `-apple-system,BlinkMacSystemFont,
          "Segoe UI",Roboto,"Helvetica Neue",
          Arial,sans-serif,"Apple Color Emoji",
          "Segoe UI Emoji","Segoe UI Symbol"`,
};

const lightTheme: Partial<DefaultTheme> = {
  headerBackgroundColor: '#212935',
  actionsTextColor: 'backgroundBasicColor1',
};

export default function themeService(theme: DefaultTheme['name']): DefaultTheme {
  switch (theme) {
    case 'dark':
    case 'cosmic':
      return createTheme(theme, shared);
    case 'corporate':
    default:
      return createTheme(theme, { ...shared, ...lightTheme });
  }
}
