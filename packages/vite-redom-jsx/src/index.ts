import transform from 'babel-plugin-transform-redom-jsx'
import { transformSync } from '@babel/core'
import { regexpScripts } from './constants.js'
import { insertFragment } from './fragment.js'
import type { PluginOption } from 'vite'

export default function redomJsxPlugin(): PluginOption {
  return {
    name: 'vite-redom-jsx',
    config() {
      return {
        resolve: {
          dedupe: [
            'redom'
          ]
        },
        esbuild: {
          jsx: 'preserve',
          jsxInject: `import { el, Fragment } from 'redom-jsx'`,
          jsxFactory: 'el',
          jsxFragment: 'Fragment'
        }
      }
    },
    transform(src, path) {
      let code = src

      if (regexpScripts.test(path)) {
        const out = transformSync(
          insertFragment(src),
          {
            code: true,
            plugins: [
              transform,
              [
                'transform-react-jsx',
                {
                  pragma: 'el'
                }
              ]
            ]
          }
        )

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
