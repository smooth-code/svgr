import { getFilePath, getBaseSvgoConfig, mergeSvgoConfig } from './config'

describe('svgo config', () => {
  describe('#getFilePath', () => {
    describe('if `state.filePath` exists', () => {
      it('returns `state.filePath', () => {
        expect(getFilePath({ filePath: '/foo/bar' })).toBe('/foo/bar')
      })
    })
    describe('if `state.filePath` does not exists', () => {
      it('returns current working directory', () => {
        expect(getFilePath({})).toBe(process.cwd())
      })
    })
  })

  describe('#getBaseSvgoConfig', () => {
    describe('with no specific config', () => {
      it('returns config with `prefixIds: true`', () => {
        expect(getBaseSvgoConfig({ full: true })).toEqual({
          plugins: [{ name: 'prefixIds', active: true }],
        })
      })
    })

    describe('with `config.icons` enabled', () => {
      it('returns config with `removeViewBox: false`', () => {
        expect(getBaseSvgoConfig({ icon: true, full: true })).toEqual({
          plugins: [{ name: 'prefixIds', active: true }, { name: 'removeViewBox', active: false }],
        })
      })
    })

    describe('with `config.dimensions` disabled', () => {
      it('returns config with `removeViewBox: false`', () => {
        expect(getBaseSvgoConfig({ dimensions: false, full: true })).toEqual({
          plugins: [{ name: 'prefixIds', active: true }, { name: 'removeViewBox', active: false }],
        })
      })
    })
  })

  describe('#mergeSvgoConfig', () => {
    it('merges any config format', () => {
      expect(mergeSvgoConfig({ foo: 'bar' }, { foo: 'rab' })).toEqual({
        foo: 'rab',
        plugins: [],
      })
      expect(
        mergeSvgoConfig({ plugins: { name: 'removeViewBox', active: false } }, null),
      ).toEqual({
        plugins: [{ name: 'removeViewBox', active: false }],
      })
      expect(
        mergeSvgoConfig({ plugins: { name: 'removeViewBox', active: false } }, {}),
      ).toEqual({
        plugins: [{ name: 'removeViewBox', active: false }],
      })
      expect(mergeSvgoConfig({ plugins: { name: 'removeViewBox', active: false } })).toEqual({
        plugins: [{ name: 'removeViewBox', active: false }],
      })
      expect(mergeSvgoConfig({ plugins: [{ name: 'removeViewBox', active: false }] })).toEqual({
        plugins: [{ name: 'removeViewBox', active: false }],
      })
      expect(
        mergeSvgoConfig({
          plugins: [{ name: 'removeViewBox', active: false }, { name: 'removeViewBox', active: true }],
        }),
      ).toEqual({
        plugins: [{ name: 'removeViewBox', active: true }],
      })
      expect(
        mergeSvgoConfig({
          plugins: [
            {
              name: 'convertColors',
              params: {
                currentColor: true,
              },
            },
            {
              name: 'prefixIds',
              params: {
                prefix: 'foo',
              },
            },
          ],
        }),
      ).toEqual({
        plugins: [
          {
            name: 'convertColors',
            params: {
              currentColor: true,
            },
          },
          {
            name: 'prefixIds',
            params: {
              prefix: 'foo',
            },
          },
        ],
      })
      expect(
        mergeSvgoConfig(
          {
            plugins: [
              {
                name: 'prefixIds',
                params: {
                  prefix: 'foo',
                },
              },
              {
                name: 'prefixIds',
                params: {
                  prefix: 'bar',
                },
              },
            ],
          },
        ),
      ).toEqual({
        plugins: [
          {
            name: 'prefixIds',
            params: {
              prefix: 'bar',
            },
          },
        ],
      })
    })
  })
})
