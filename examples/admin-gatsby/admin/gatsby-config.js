module.exports = {
  siteMetadata: {
    title: 'Prisma Admin',
    description: 'Admin dashboard template based on Gatsby with oah-ui component package.',
    author: 'Ahmed Elywa',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://prisma-tools.herokuapp.com',
        credentials: 'include',
        connectToDevTools: true,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/Layouts/index.tsx`),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'hub-backstage',
        short_name: 'HUB',
        start_url: '/dashboard',
        display: 'minimal-ui',
        icon: 'src/images/Logo.png', // This path is relative to the root of the site.
      },
    },
  ],
};
