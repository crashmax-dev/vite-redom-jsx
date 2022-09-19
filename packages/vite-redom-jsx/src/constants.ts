export const regexpJSX = new RegExp(/\.(t|j)sx$/)

export const fragmentMap: Record<string, string> = {
  '<>': '<Fragment>',
  '</>': '</Fragment>'
}
