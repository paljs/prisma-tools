import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import { EvaIcon } from 'oah-ui';
import styled from 'styled-components';

const ALink: React.FC<any> = ({ href, children }) => {
  const internal = /^\/(?!\/)/.test(href);

  if (internal) {
    return <Link to={href}>{children}</Link>;
  }
  return (
    <a href={href} target={href.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer">
      {children}
    </a>
  );
};

type Headers = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const StyledHeader = (tag: Headers) => styled(tag)`
  margin-top: -3.75rem;
  padding-top: 4.75rem;

  :hover {
    a {
      opacity: 1;
    }
  }
  a {
    text-decoration: none;
    margin-right: 5px;
    margin-left: -28px;
    opacity: 0;
    .hash-icon {
      font-size: 1.5rem;
    }
  }
`;

const heading = (tag: Headers): React.FC<any> => {
  const Tag = StyledHeader(tag);
  return function TagComponent(props) {
    if (!props.id) return <Tag {...props} />;
    return (
      <Tag {...props}>
        <a href={`#${props.id}`} rel="noopener noreferrer">
          <EvaIcon name="hash-outline" className="hash-icon" />
        </a>
        {props.children}
      </Tag>
    );
  };
};

const Heading = {
  H1: heading('h1'),
  H2: heading('h2'),
  H3: heading('h3'),
  H4: heading('h4'),
  H5: heading('h5'),
  H6: heading('h6'),
};

const Blockquote: React.FC = (props) => {
  return (
    <div className="note note-info">
      <div className="note-body">{props.children}</div>
    </div>
  );
};

const MdxLayout: React.FC = ({ children }) => {
  return (
    <MDXProvider
      components={{
        a: ALink,
        h1: Heading.H1,
        h2: Heading.H2,
        h3: Heading.H3,
        h4: Heading.H4,
        h5: Heading.H5,
        h6: Heading.H6,
        blockquote: Blockquote,
      }}
    >
      {children}
    </MDXProvider>
  );
};

export default MdxLayout;
