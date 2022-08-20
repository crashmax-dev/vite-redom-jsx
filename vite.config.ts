import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es'],
      name: 'vite-redom-jsx'
    },
    rollupOptions: {
      external: [
        'redom'
      ],
      output: {
        exports: 'named',
        globals: {
          'redom': 'redom'
        }
      }
    }
  }
})
