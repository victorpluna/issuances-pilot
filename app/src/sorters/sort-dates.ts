export const sortDates = (previous: Date, next: Date) => (+previous === +next ? 0 : +previous < +next ? -1 : 1)
