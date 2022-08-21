import type { PluginOption } from 'vite'

function redom(): PluginOption {
  return {
    name: 'vite-plugin-redom',
    config() {
      return {
        esbuild: {
          jsxInject: `import { h, Fragment } from 'redom-jsx'`,
          jsxFactory: 'h',
          jsxFragment: 'Fragment'
        }
      }
    }
  }
}

export { redom }
export default redom
