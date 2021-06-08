import { extendDefaultPlugins } from 'svgo';
import deepmerge from 'deepmerge'

export function getFilePath(state) {
  return state.filePath || process.cwd()
}

export function getBaseSvgoConfig(config) {
  const baseSvgoConfig = {
    plugins: [{ name: 'prefixIds', active: true }],
  }
  if (config.icon || config.dimensions === false) {
    baseSvgoConfig.plugins.push({ name: 'removeViewBox', active: false })
  }

  return {
      plugins: config.full ? baseSvgoConfig.plugins : extendDefaultPlugins(baseSvgoConfig.plugins)
  }
}

export function getPlugins(config) {
  if (!config || !config.plugins) {
    return []
  }
  if (!Array.isArray(config.plugins)) {
    throw Error('`svgoConfig.plugins` must be an array')
  }
  return config.plugins
}

function extractPlugins(config) {
  if (!config) return []
  if (!config.plugins) return []
  if (!Array.isArray(config.plugins)) return [config.plugins]
  return config.plugins
}

function mergePlugins(configs) {
  return configs
      .flatMap(extractPlugins)
      .reduce((plugins, plugin) => {
        const index = plugins.findIndex(accPlugin => accPlugin.name === plugin.name);
        if (index > -1) {
          plugins[index] = deepmerge(plugins[index], plugin)
        } else {
          plugins = [...plugins, plugin];
        }

        return plugins;
      }, []);
}

export function mergeSvgoConfig(...configs) {
  const plugins = mergePlugins(configs)
  return { ...deepmerge.all(configs.filter(Boolean)), plugins }
}
