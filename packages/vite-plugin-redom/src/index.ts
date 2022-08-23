import type { PluginOption } from 'vite'

function redom(): PluginOption {
  return {
    name: 'vite-plugin-redom',
    config() {
      return {
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

export { redom }
export default redom
