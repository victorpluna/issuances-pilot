export const sortStrings = (previous: string, next: string) =>
  previous.localeCompare(next, 'en', { sensitivity: 'base' })
