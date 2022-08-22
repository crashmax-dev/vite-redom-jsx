import { defineConfig } from 'tsup'

export default defineConfig((config) => ({
  entry: ['src/index.ts', 'src/jsx.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  minify: true,
  dts: true,
  watch: config.watch
}))
