export const srcLocal = (fullpath: string): string =>  {
  if (import.meta.env.PROD) {
    return `${fullpath}`
  } else {
    return `/local/file?path=${encodeURIComponent(fullpath)}`
  }
}
