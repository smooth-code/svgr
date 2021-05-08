export interface TemplateOptions extends SvgrOpts {}

export interface TemplateData {
  imports?: string[]
  interfaces?: string[]
  componentName?: string
  props?: string[]
  jsx?: string
  exports?: string[]
}

export type TemplateFunc = (
  templateOptions: { template: unknown },
  opts: TemplateOptions,
  data: TemplateData,
) => string

export interface SvgrOpts {
  /** Specify a custom config file. */
  configFile?: string
  /** Replace SVG width and height with 1em to make SVG inherit text size. */
  icon?: boolean
  /** Custom extension for generated files (default "js"). */
  ext?: string
  /** Modify all SVG nodes with uppercase and use react-native-svg template. */
  native?: boolean | { expo: boolean }
  /** Generate .tsx files with TypeScript bindings. */
  typescript?: boolean
  /** Keep width and height attributes from the root SVG tag. */
  dimensions?: boolean
  /** Forward all properties on the React component to the SVG tag. */
  expandProps?: 'start' | 'end' | false
  /** Use Prettier to format JavaScript code output. */
  prettier?: boolean
  /** Specify prettier config. */
  prettierConfig?: Record<string, unknown>
  /** Use SVGO to optimize SVG code before transforming into a React component. Default: true. */
  svgo?: boolean
  /** Specify SVGO config. https://gist.github.com/pladaria/69321af86ce165c2c1fc1c718b098dd0 */
  svgoConfig?: Record<string, unknown>
  /** Forward the ref to the root SVG tag if true. */
  ref?: boolean
  /** Wrap the exported component in React.memo if true. */
  memo?: boolean
  /**
   * Replace an attribute value by another. Intended for changing an Icon
   * color to currentColor to inherit from text color.
   *
   * Specify dynamic property using curly braces: { '#000': "{props.color}" }
   */
  replaceAttrValues?: Record<string, string>
  /**
   * Add props to the SVG tag.
   *
   * Specify dynamic property using curly braces: { focusable: "{true}" }.
   * Particularly useful with a custom template.
   */
  svgProps?: Record<string, string>
  /**
   * Add title tag via title property. If titleProp is set to true and no
   * title is provided (title={undefined}) at render time, this will fallback
   * to an existing title element in the svg if it exists.
   */
  titleProp?: boolean
  /**
   * Specify a template file (CLI) or a template function (API) to use.
   * For an example of template, see the default one.
   * https://github.com/gregberge/svgr/blob/main/packages/babel-plugin-transform-svg-component/src/index.js
   */
  template?: TemplateFunc
  /** Output files into a directory. */
  outDir?: string
  /**
   * Specify a template function (API) to change default index.js output
   * (when --out-dir is used).
   *
   * https://github.com/gregberge/svgr/blob/main/packages/cli/src/dirCommand.js#L39
   */
  indexTemplate?: (filePaths: string[]) => string
  /** When used with --out-dir, it ignores already existing files. */
  ignoreExisting?: boolean
  /**
   * Specify a custom filename case. Possible values: pascal for PascalCase,
   * kebab for kebab-case or camel for camelCase.
   */
  filenameCase?: 'kebab' | 'camel' | 'pascal'
}

type ConvertT = {
  (svgCode: string, opts?: SvgrOpts, state?: TemplateData): Promise<void>
  sync: (svgCode: string, opts?: SvgrOpts, state?: TemplateData) => void
}

declare const convert: ConvertT

export default convert
