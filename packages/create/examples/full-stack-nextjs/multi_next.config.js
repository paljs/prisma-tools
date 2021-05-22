module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
    JWT_SECRET: 'changeMe',
  },
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.ContextReplacementPlugin(/prisma/));
    config.plugins.push(new webpack.WatchIgnorePlugin([['prisma1', 'prisma2']]));

    // Important: return the modified config
    return config;
  },
};
