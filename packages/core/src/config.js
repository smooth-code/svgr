import { cosmiconfig, cosmiconfigSync } from 'cosmiconfig'

export const DEFAULT_CONFIG = {
  dimensions: true,
  expandProps: 'end',
  icon: false,
  native: false,
  typescript: false,
  prettier: true,
  prettierConfig: null,
  memo: false,
  ref: false,
  replaceAttrValues: null,
  svgProps: null,
  svgo: true,
  svgoConfig: { plugins: [{ name: 'convertStyleToAttrs', active: true }]},
  template: null,
  titleProp: false,
  runtimeConfig: true,
  plugins: null,
  namedExport: 'ReactComponent',
}

const explorer = cosmiconfig('svgr', {
  sync: true,
  cache: true,
  rcExtensions: true,
})

const explorerSync = cosmiconfigSync('svgr', {
  sync: true,
  cache: true,
  rcExtensions: true,
})

export async function resolveConfig(searchFrom, configFile) {
  if (configFile == null) {
    const result = await explorer.search(searchFrom)
    return result ? result.config : null
  }
  const result = await explorer.load(configFile)
  return result ? result.config : null
}

resolveConfig.sync = (searchFrom, configFile) => {
  if (configFile == null) {
    const result = explorerSync.search(searchFrom)
    return result ? result.config : null
  }
  const result = explorerSync.load(configFile)
  return result ? result.config : null
}

export async function resolveConfigFile(filePath) {
  const result = await explorer.search(filePath)
  return result ? result.filepath : null
}

resolveConfigFile.sync = (filePath) => {
  const result = explorerSync.search(filePath)
  return result ? result.filepath : null
}

export async function loadConfig({ configFile, ...baseConfig }, state = {}) {
  const rcConfig =
    state.filePath && baseConfig.runtimeConfig !== false
      ? await resolveConfig(state.filePath, configFile)
      : {}
  return { ...DEFAULT_CONFIG, ...rcConfig, ...baseConfig }
}

loadConfig.sync = ({ configFile, ...baseConfig }, state = {}) => {
  const rcConfig =
    state.filePath && baseConfig.runtimeConfig !== false
      ? resolveConfig.sync(state.filePath, configFile)
      : {}
  return { ...DEFAULT_CONFIG, ...rcConfig, ...baseConfig }
}
