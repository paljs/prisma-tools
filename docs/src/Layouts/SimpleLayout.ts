import { createGlobalStyle, css } from 'styled-components';
import { breakpointDown } from 'oah-ui';
import { GlobalStyle } from 'oah-ui';

const SimpleLayout = createGlobalStyle`
${({ theme }) => css`
  ${GlobalStyle}
  html {
    font-size: 16px;
  }

  .column.small {
    flex: 0.15 !important;
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

  button {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 500;
    font-family: Exo;
    border: 2px solid transparent;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  .language-text {
    display: inline-block;
  }
  code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: none;
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
    font-feature-settings: normal;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    overflow: auto;
    padding: 1.3125rem;
    margin: 0;
  }

  pre[class*='language-']::-moz-selection {
    /* Firefox */
    background: hsl(207, 4%, 16%);
  }

  pre[class*='language-']::selection {
    /* Safari */
    background: hsl(207, 4%, 16%);
  }

  /* Text Selection colour */
  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    border-radius: 0.25rem;
    background: ${theme.layoutBackgroundColor};
    color: ${theme.linkTextColor};
    padding: 0.125rem 0.5rem;
    white-space: normal;
  }

  .token.attr-name {
    color: rgb(173, 219, 103);
    font-style: italic;
  }

  .token.comment {
    color: rgb(128, 147, 147);
  }

  .token.string,
  .token.url {
    color: rgb(173, 219, 103);
  }

  .token.variable {
    color: rgb(214, 222, 235);
  }

  .token.number {
    color: rgb(247, 140, 108);
  }

  .token.builtin,
  .token.char,
  .token.constant,
  .token.function {
    color: rgb(130, 170, 255);
  }

  .token.punctuation {
    color: rgb(199, 146, 234);
  }

  .token.selector,
  .token.doctype {
    color: rgb(199, 146, 234);
    font-style: 'italic';
  }

  .token.class-name {
    color: rgb(255, 203, 139);
  }

  .token.tag,
  .token.operator,
  .token.keyword {
    color: #ffa7c4;
  }

  .token.boolean {
    color: rgb(255, 88, 116);
  }

  .token.property,
  .token.annotation {
    color: rgb(128, 203, 196);
  }

  .token.namespace {
    color: rgb(178, 204, 214);
  }

  pre[data-line] {
    padding: 1em 0 1em 3em;
    position: relative;
  }

  .gatsby-highlight-code-line {
    background-color: hsla(207, 95%, 15%, 1);
    display: block;
    margin-right: -1.3125rem;
    margin-left: -1.3125rem;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #ffa7c4;
  }

  .gatsby-highlight {
    margin-bottom: 1.75rem;
    /* max-height: 30rem; */
    border-radius: 10px;
    background: #011627;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  @media (max-width: 672px) {
    .gatsby-highlight {
      border-radius: 0;
    }
  }

  .gatsby-highlight pre[class*='language-'] {
    float: left;
    min-width: 100%;
  }
`}
`;
export default SimpleLayout;
