import { PluginEntrypoint } from 'nexus/plugin'
import { Settings } from '@paljs/nexus'

export const paljs: PluginEntrypoint<Settings> = (settings) => ({
  settings,
  packageJsonPath: require.resolve('../package.json'),
  runtime: {
    module: require.resolve('./runtime'),
    export: 'plugin',
  },
})
