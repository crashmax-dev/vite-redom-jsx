import transform from 'babel-plugin-transform-redom-jsx'
import redom from 'vite-plugin-redom'
import { transformSync } from '@babel/core'
import type { PluginOption } from 'vite'

const regexpScripts = new RegExp(/.(t|j)sx?/)

export default function redomJsxPlugin(): PluginOption {
  return {
    name: 'vite-redom-jsx',
    enforce: 'pre',
    config() {
      return {
        plugins: [
          redom()
        ]
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

function insertFragment(code: string): string {
  return code
    .replace(/<>/, '<Fragment>')
    .replace(/<\/>/, '</Fragment>')
}
