import { el, mount, unmount, setAttr, setChildren } from 'redom'
import type { RedomComponent } from 'redom'
import './types.d.ts'

class Fragment {
  public el: DocumentFragment

  constructor(_: unknown, ...children: RedomComponent[]) {
    const fragment = document.createDocumentFragment()
    setChildren(fragment, children)
    this.el = fragment
  }
}

export {
  el,
  Fragment,
  mount,
  unmount,
  setAttr,
  setChildren
}
