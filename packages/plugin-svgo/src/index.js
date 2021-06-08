/* eslint-disable no-underscore-dangle */
import { optimize } from 'svgo'
import { cosmiconfigSync } from 'cosmiconfig'
import { getFilePath, getBaseSvgoConfig, mergeSvgoConfig } from './config'

const explorer = cosmiconfigSync('svgo', {
  searchPlaces: [
    'package.json',
    '.svgorc',
    '.svgorc.js',
    '.svgorc.json',
    '.svgorc.yaml',
    '.svgorc.yml',
    'svgo.config.js',
    '.svgo.yml',
  ],
  transform: (result) => result && result.config,
  cache: true,
})

function getConfig(config, rcConfig) {
  const baseSvgoConfig = getBaseSvgoConfig(config)
  const mergedConfig = mergeSvgoConfig(
    baseSvgoConfig,
    rcConfig,
    config.svgoConfig,
  )
  return mergedConfig;
}

function getInfo(state) {
  return state.filePath
    ? { input: 'file', path: state.filePath }
    : { input: 'string' }
}

export default function svgoPlugin(code, config, state) {
  if (!config.svgo) return code
  const filePath = getFilePath(state)
  const svgoRcConfig = config.runtimeConfig ? explorer.search(filePath) : {}
  const mergedConfig = getConfig(config, svgoRcConfig)
  const { data } = optimize(code, { ...getInfo(state), ...mergedConfig });
  return data
}
