export declare namespace JSX {
  interface IntrinsicElements {
    [tag: string]: BaseProps
  }
}

interface BaseProps extends Partial<TagProps> {
  [property: string]: any
}

type ElementWithoutReadonlyProps<T = HTMLElement> = Pick<T, WritableKeys<T>>
type ElementProps = Omit<
  ElementWithoutReadonlyProps,
  FunctionPropertyNames<ElementWithoutReadonlyProps>
>

interface TagProps extends ElementProps {
  id: string | number
  value: string | number
  style: Partial<CSSStyleDeclaration>
  type: string
  for: string | number
}

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
  >() => T extends Y ? 1 : 2
  ? A
  : B

type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >
}[keyof T]

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
