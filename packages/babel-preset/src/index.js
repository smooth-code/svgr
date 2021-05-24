import addJSXAttribute from '@svgr/babel-plugin-add-jsx-attribute'
import removeJSXAttribute from '@svgr/babel-plugin-remove-jsx-attribute'
import removeJSXEmptyExpression from '@svgr/babel-plugin-remove-jsx-empty-expression'
import replaceJSXAttributeValue from '@svgr/babel-plugin-replace-jsx-attribute-value'
import svgDynamicTitle from '@svgr/babel-plugin-svg-dynamic-title'
import svgEmDimensions from '@svgr/babel-plugin-svg-em-dimensions'
import transformReactNativeSVG from '@svgr/babel-plugin-transform-react-native-svg'
import transformSvgComponent from '@svgr/babel-plugin-transform-svg-component'

function getAttributeValue(value) {
  const literal =
    typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
  return { value: literal ? value.slice(1, -1) : value, literal }
}

function propsToAttributes(props) {
  return Object.keys(props).map((name) => {
    const { literal, value } = getAttributeValue(props[name])
    return { name, literal, value }
  })
}

function replaceMapToValues(replaceMap) {
  return Object.keys(replaceMap).map((value) => {
    const { literal, value: newValue } = getAttributeValue(replaceMap[value])
    return { value, newValue, literal }
  })
}

const plugin = (api, opts) => {
  let toRemoveAttributes = ['version']
  let toAddAttributes = []

  if (opts.svgProps) {
    toAddAttributes = [...toAddAttributes, ...propsToAttributes(opts.svgProps)]
  }

  if (opts.ref) {
    toAddAttributes = [
      ...toAddAttributes,
      {
        name: 'ref',
        value: 'svgRef',
        literal: true,
      },
    ]
  }

  if (opts.titleProp) {
    toAddAttributes = [
      ...toAddAttributes,
      {
        name: 'aria-labelledby',
        value: 'titleId',
        literal: true,
      },
    ]
  }

  if (opts.expandProps) {
    if(opts.expandProps === "start" || opts.expandProps === "end"){
      toAddAttributes = [
        ...toAddAttributes,
        {
          name: 'props',
          spread: true,
          position: opts.expandProps,
        },
      ]
    }
  }

  if (!opts.dimensions) {
    toRemoveAttributes = [...toRemoveAttributes, 'width', 'height']
  }

  const plugins = [
    [transformSvgComponent, opts],
    ...(opts.icon && opts.dimensions ? [svgEmDimensions] : []),
    [
      removeJSXAttribute,
      { elements: ['svg', 'Svg'], attributes: toRemoveAttributes },
    ],
    [
      addJSXAttribute,
      { elements: ['svg', 'Svg'], attributes: toAddAttributes },
    ],
    removeJSXEmptyExpression,
  ]

  if (opts.replaceAttrValues) {
    plugins.push([
      replaceJSXAttributeValue,
      { values: replaceMapToValues(opts.replaceAttrValues) },
    ])
  }

  if (opts.titleProp) {
    plugins.push(svgDynamicTitle)
  }

  if (opts.native) {
    if (opts.native.expo) {
      plugins.push([transformReactNativeSVG, opts.native])
    } else {
      plugins.push(transformReactNativeSVG)
    }
  }

  return { plugins }
}

export default plugin
