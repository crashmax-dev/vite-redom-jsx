import type { PluginOption } from 'vite'

export default function redomPlugin(): PluginOption {
  return {
    name: 'vite-plugin-redom',
    enforce: 'pre',
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
    }
  }
}
