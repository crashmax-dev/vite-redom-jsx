import { defineConfig } from 'tsup'

export default defineConfig((config) => ({
  entry: ['src/index.ts'],
  format: ['cjs'],
  clean: true,
  minify: true,
  dts: true,
  watch: config.watch
}))
