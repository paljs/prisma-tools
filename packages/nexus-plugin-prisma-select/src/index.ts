import { PluginEntrypoint } from 'nexus/plugin'

export const prismaSelect: PluginEntrypoint = () => ({
  packageJsonPath: require.resolve('../package.json'),
  runtime: {
    module: require.resolve('./runtime'),
    export: 'plugin',
  },
})
