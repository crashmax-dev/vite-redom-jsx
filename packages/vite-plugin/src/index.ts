import type { PluginOption } from 'vite'

export default function redom(): PluginOption {
  return {
    name: 'redom-jsx',
    config() {
      return {
        esbuild: {
          jsxInject: `import { h, Fragment } from 'vite-redom-jsx'`,
          jsxFactory: 'h',
          jsxFragment: 'Fragment'
        }
      }
    }
  }
}
