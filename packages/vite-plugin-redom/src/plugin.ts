import type { PluginOption } from 'vite'

export function redom(): PluginOption {
  return {
    name: 'vite-plugin-redom',
    config() {
      return {
        esbuild: {
          jsxInject: `import { h, Fragment } from 'vite-plugin-redom/jsx'`,
          jsxFactory: 'h',
          jsxFragment: 'Fragment'
        }
      }
    }
  }
}
