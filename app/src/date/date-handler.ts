import { momentDateHandler } from './moment-date-handler'

export interface DateHandler<TDateLibrary> {
  newDate: (date?: Date) => TDateLibrary
  getDifference: (params: { firstDate: TDateLibrary; secondDate: TDateLibrary; unitOfTime: string }) => number
  toDate: (date?: TDateLibrary) => Date
  startOfDay: (date: TDateLibrary) => TDateLibrary
  endOfDay: (date: TDateLibrary) => TDateLibrary
  isSame: (params: { firstDate: TDateLibrary; sameDate: TDateLibrary }) => boolean
  isSameOrAfter: (params: { firstDate: TDateLibrary; secondDate: TDateLibrary }) => boolean
  isSameOrBefore: (params: { firstDate: TDateLibrary; beforeDate: TDateLibrary }) => boolean
  isWeekend: (date: TDateLibrary) => boolean
  isBefore: (params: { firstDate: TDateLibrary; secondDate: TDateLibrary }) => boolean
  isBetween: (params: { beforeDate: TDateLibrary; isBetweenDate: TDateLibrary; afterDate: TDateLibrary }) => boolean
  addDays: (params: { days: number; date?: TDateLibrary }) => TDateLibrary
  formatDate: (params: { date: TDateLibrary; format?: string }) => string
  fromNow: (params: { date: TDateLibrary }) => string
}

export const dateHandler = momentDateHandler
