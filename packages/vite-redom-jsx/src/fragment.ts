import { fragmentMap } from './constants.js'

export function insertFragment(code: string): string {
  return code.replace(/(<>|<\/>)/g, (fragment) => fragmentMap[fragment])
}
