export function unsafeMerge(target: any, source: any) {
  for (const key in source) {
    target[key] = source[key]
  }
}
