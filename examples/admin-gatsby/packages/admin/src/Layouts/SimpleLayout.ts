import { createGlobalStyle, css } from 'styled-components';
import { breakpointDown, GlobalStyle } from 'oah-ui';

const SimpleLayout = createGlobalStyle`
${({ theme }) => css`
  ${GlobalStyle}
  html {
    font-size: 16px;
  }
  .column.small {
    flex: 0.15 !important;
  }

  .auth-layout {
    .main-content {
      padding: 2.5rem;
      ${breakpointDown('sm')`
        padding: 0;
      `}
    }
  }

  aside.settings-sidebar {
    transition: transform 0.3s ease;
    width: 19rem;
    overflow: hidden;
    transform: translateX(${theme.dir === 'rtl' && '-'}100%);
    &.start {
      transform: translateX(${theme.dir === 'ltr' && '-'}100%);
    }

    &.expanded,
    &.expanded.start {
      transform: translateX(0);
    }

    .scrollable {
      width: 19rem;
      padding: 3.4rem 0.25rem;
    }

    .main-container {
      width: 19rem;
      transition: width 0.3s ease;
      overflow: hidden;

      .scrollable {
        width: 19rem;
      }
    }
  }

  ${breakpointDown('xs')`
    .main-content {
        padding: 0.75rem !important;
      }
  `}

  .with-margin {
    margin: 0 0.75rem 2rem 0;
  }
  .inline-block {
    display: inline-block;
  }
  .popover-card {
    margin-bottom: 0;
    width: 300px;
    box-shadow: none;
  }
  .btn {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 500;
    border: 2px solid transparent;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  .ck-content {
    min-height: 20rem;
  }
  a {
    color: ${theme.linkTextColor};
    font-weight: ${theme.cardTextFontWeight};
    text-decoration: none;
    &:hover {
      color: ${theme.linkTextHoverColor};
      text-decoration: underline;
    }
  }
`}
`;
export default SimpleLayout;
