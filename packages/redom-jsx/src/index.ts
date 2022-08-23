import { el } from 'redom'
import './types.d.ts'

type Children = (Node | string)[]
type Props = Record<string, string>
type Tag = ((props: Props, children: Children) => HTMLElement) | string

const appendChildrens = (
  element: HTMLElement | DocumentFragment,
  childrens: Children
) => {
  for (const children of childrens) {
    if (Array.isArray(children)) {
      appendChildrens(element, children)
    } else {
      element.append(children)
    }
  }
}

export const h = (tag: Tag, props: Props, ...childrens: Children) => {
  if (typeof tag === 'function') {
    return tag(props, childrens)
  }

  const element = el(tag, props)
  appendChildrens(element, childrens)

  return element
}

export const Fragment = (_props: Props, ...childrens: Children) => {
  const fragment = document.createDocumentFragment()
  appendChildrens(fragment, childrens)
  return fragment
}
