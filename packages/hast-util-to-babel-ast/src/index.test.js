import { parse } from 'svg-parser'
import generate from '@babel/generator'
import hastToBabelAst from './index'

function transform(code) {
  const hastTree = parse(code)

  const babelTree = hastToBabelAst(hastTree)

  const { code: generatedCode } = generate(babelTree)

  return generatedCode
}

describe('hast-util-to-babel-ast', () => {
  it('should correctly transform svg', () => {
    const code = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
    <title>Dismiss</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Blocks" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
        <g id="Dismiss" stroke="#063855" stroke-width="2">
            <path d="M51,37 L37,51" id="Shape"></path>
            <path d="M51,51 L37,37" id="Shape"></path>
        </g>
    </g>
</svg>
`
    expect(transform(code)).toMatchSnapshot()
  })

  it('should correctly transform aria-x', () => {
    const code = `<svg aria-hidden="true"></svg>`
    expect(transform(code)).toMatchInlineSnapshot(
      `"<svg aria-hidden=\\"true\\" />;"`,
    )
  })

  it('should correctly transform aria-xxxXxx', () => {
    const code = `<svg aria-labelledby="foo" aria-describedat="foo" aria-describedby="foo"></svg>`
    expect(transform(code)).toMatchInlineSnapshot(
      `"<svg aria-labelledby=\\"foo\\" aria-describedat=\\"foo\\" aria-describedby=\\"foo\\" />;"`,
    )
  })

  it('should correctly transform data-x', () => {
    const code = `<svg data-hidden="true"></svg>`
    expect(transform(code)).toMatchInlineSnapshot(
      `"<svg data-hidden=\\"true\\" />;"`,
    )
  })

  it('should handle spaces and tab', () => {
    const code = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M25,5h-3V3c0-1.7-1.3-3-3-3H5C3.3,0,2,1.3,2,3v20c0,1.7,1.3,3,3,3h4v1c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V9
      \tC29,6.8,27.2,5,25,5z M5,24c-0.6,0-1-0.5-1-1V3c0-0.6,0.4-1,1-1h14c0.5,0,1,0.4,1,1v2h-6.3H13H6.3c-0.6,0-1,0.4-1,1s0.4,1,1,1h3.2
      C9.4,7.3,9.2,7.7,9.1,8C9.1,8,9,8,9,8H6.5c-0.6,0-1,0.4-1,1s0.4,1,1,1H9v3c-0.1,0-0.1,0-0.2,0H6.1c-0.6,0-1,0.4-1,1s0.4,1,1,1h2.7
      c0.1,0,0.1,0,0.2,0V16c-0.1,0-0.1,0-0.2,0H6.1c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h2.7c0.1,0,0.1,0,0.2,0V19c-0.1,0-0.1,0-0.2,0H6.1
      c-0.6,0-1,0.4-1,1s0.4,1,1,1h2.7c0.1,0,0.1,0,0.2,0v3H5z M27,27c0,1.1-0.9,2-2,2H13c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h0.7H25
      c1.1,0,2,0.9,2,2V27z M25.2,19c0,0.6-0.4,1-1,1H13.4c-0.6,0-1-0.4-1-1s0.4-1,1-1h10.7C24.7,18,25.2,18.4,25.2,19z M25.2,22
      c0,0.6-0.4,1-1,1H13.4c-0.6,0-1-0.4-1-1s0.4-1,1-1h10.7C24.7,21,25.2,21.4,25.2,22z M25.2,25c0,0.6-0.4,1-1,1H13.4c-0.6,0-1-0.4-1-1
      s0.4-1,1-1h10.7C24.7,24,25.2,24.4,25.2,25z M12.3,11c0-0.6,0.4-1,1-1h7.3c0.6,0,1,0.4,1,1s-0.4,1-1,1h-7.3
      C12.8,12,12.3,11.6,12.3,11z M16,13c0.6,0,1,0.4,1,1s-0.4,1-1,1h-2.5c-0.6,0-1-0.4-1-1s0.4-1,1-1H16z"/>
    </svg>
    `

    expect(transform(code)).toMatchSnapshot()
  })

  it('string literals children of text nodes should have decoded XML entities', () => {
    const code = `<svg><text>&lt;</text></svg>`
    expect(transform(code)).toMatchInlineSnapshot(
      `"<svg><text>{\\"<\\"}</text></svg>;"`,
    )
  })

  it('string literals children of tspan nodes should have decoded XML entities', () => {
    const code = `<svg><text><tspan>&lt;</tspan></text></svg>`
    expect(transform(code)).toMatchInlineSnapshot(
      `"<svg><text><tspan>{\\"<\\"}</tspan></text></svg>;"`,
    )
  })
})
