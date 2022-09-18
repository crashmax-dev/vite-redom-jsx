import transform from 'babel-plugin-transform-redom-jsx'
import { transformSync } from '@babel/core'
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
          jsxInject: `import { h, text, Fragment } from 'redom-jsx'`,
          jsxFactory: 'h',
          jsxFragment: 'Fragment'
        }
      }
    },
    transform(src, path) {
      let code = src

      if (path.endsWith('.tsx') || path.endsWith('.jsx')) {
        const out = transformSync(
          insertFragment(src),
          {
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
