import transform from 'babel-plugin-transform-redom-jsx'
import type { PluginOption } from 'vite'
import { transformSync } from '@babel/core'
import { regexpJSX } from './constants.js'
import { insertFragment } from './fragment.js'

export default function redomJsxPlugin(): PluginOption {
  return {
    name: 'vite-redom-jsx',
    config() {
      return {
        resolve: {
          dedupe: ['redom']
        },
        esbuild: {
          jsx: 'preserve',
          jsxInject: `import { h, text, Fragment } from 'redom-jsx'`,
          jsxFactory: 'h',
          jsxFragment: 'Fragment'
        }
      }
    },
    transform(src, path) {
      let code = src

      if (regexpJSX.test(path)) {
        const out = transformSync(insertFragment(src), {
          code: true,
          plugins: [
            transform,
            [
              'transform-react-jsx',
              {
                pragma: 'h'
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
