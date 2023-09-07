export const sortNumbers = (previous: number, next: number) => (previous === next ? 0 : previous < next ? -1 : 1)
