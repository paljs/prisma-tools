import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

const SEO: React.FC<SEOProps> = ({ description, lang, meta, keywords, title }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription = description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang: lang ?? 'en',
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: data.site.siteMetadata.author,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : [],
              )
              .concat(meta ?? [])}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  keywords: ['OAH', 'application', 'react'],
};

interface SEOProps {
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
}

export default SEO;
