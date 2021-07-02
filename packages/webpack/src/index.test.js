import path from 'path'
import webpack from 'webpack'
import MemoryFs from 'memory-fs'

function compile(rules) {
  const compiler = webpack({
    mode: 'development',
    context: __dirname,
    entry: './__fixtures__/icon.svg',
    output: {
      path: __dirname,
      filename: 'bundle.js',
    },
    module: { rules },
  })

  compiler.outputFileSystem = new MemoryFs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }

      resolve(
        stats
          .toJson({ source: true })
          .modules.find(({ name }) => name === './__fixtures__/icon.svg')
          .source,
      )
    })
  })
}

describe('webpack loader', () => {
  it('should convert file (typescript: true)', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, './index.js'),
            options: {
              typescript: true,
            },
          },
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  }, 15000)

  it('should convert file', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, './index.js'),
            options: {
              expandProps: false,
            },
          },
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  }, 15000)

  it('should convert file', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, './index.js'),
            options: {
              expandProps: false,
            },
          },
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  }, 15000)

  it('should support url-loader', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, './index.js'),
            options: {
              expandProps: false,
            },
          },
          'url-loader',
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  }, 15000)

  it('should convert file (babel: false)', async () => {
    const source = await compile([
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-react'],
            },
          },
          {
            loader: path.resolve(__dirname, './index.js'),
            options: {
              babel: false,
              expandProps: false,
            },
          },
        ],
      },
    ])

    expect(source).toMatchSnapshot()
  }, 15000)
})
