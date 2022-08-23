import { el, mount, unmount, setAttr, setChildren } from 'redom'
import type { RedomComponent } from 'redom'
import './types.d.ts'

export const Fragment = (_: unknown, ...childrens: RedomComponent[]) => {
  const fragment = document.createDocumentFragment()
  setChildren(fragment, childrens)
  return fragment
}

export { el, mount, unmount, setAttr, setChildren }
