// @ts-ignore
import transformRedomJsx from 'babel-plugin-transform-redom-jsx'
import { transformSync } from '@babel/core'
import type { PluginOption } from 'vite'

const isJSX = new RegExp(/.(t|j)sx?/)

export default function redomPlugin(): PluginOption {
  return {
    name: 'vite-redom-jsx',
    config() {
      return {
        esbuild: {
          jsx: 'preserve',
          jsxInject: `import { el } from 'redom'`,
          jsxFactory: 'el'
        }
      }
    },
    transform(src, path) {
      let code = src

      if (isJSX.test(path)) {
        const out = transformSync(src, {
          code: true,
          plugins: [
            transformRedomJsx,
            [
              'transform-react-jsx',
              {
                pragma: 'el'
              }
            ]
          ]
        })

        if (!out?.code) {
          throw new Error('Failed to transform jsx')
        }

        code = out.code
      }

      return {
        code,
        map: null
      }
    }
  }
}
