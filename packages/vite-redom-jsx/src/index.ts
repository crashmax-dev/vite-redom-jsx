import { transformSync } from '@babel/core'
import type { PluginOption } from 'vite'

const isJSX = new RegExp(/.(t|j)sx?/)

export default function redomPlugin(): PluginOption {
  return {
    name: 'vite-redom-jsx',
    transform(src, path) {
      let code = src

      if (isJSX.test(path)) {
        const out = transformSync(src, {
          code: true,
          plugins: [
            require.resolve('babel-plugin-transform-redom-jsx'),
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