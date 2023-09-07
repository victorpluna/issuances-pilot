import moment, { unitOfTime, Moment } from 'moment'

import { DateHandler } from './date-handler'
import { constants } from '../config/constants'

const sunday = 0
const saturday = 6
const weekendDays = [saturday, sunday]

type MomentDateHandler = DateHandler<Moment>

const newDate: MomentDateHandler['newDate'] = (date?) => moment(date)

const toDate: MomentDateHandler['toDate'] = (date) => date.toDate()

const startOfDay: MomentDateHandler['startOfDay'] = (date) => date.startOf('day')

const endOfDay: MomentDateHandler['endOfDay'] = (date) => date.endOf('day')

const isSameOrAfter: MomentDateHandler['isSameOrAfter'] = ({ firstDate, secondDate }) =>
  firstDate.isSameOrAfter(secondDate)

const isSameOrBefore: MomentDateHandler['isSameOrBefore'] = ({ firstDate, beforeDate }) =>
  firstDate.isSameOrBefore(beforeDate)

const isSame: MomentDateHandler['isSame'] = ({ firstDate, sameDate }) => firstDate.isSame(sameDate, 'day')

const isWeekend: MomentDateHandler['isWeekend'] = (date) => weekendDays.includes(date.day())

const isBefore: MomentDateHandler['isBefore'] = ({ firstDate, secondDate }) => firstDate.isBefore(secondDate)

const isBetween: MomentDateHandler['isBetween'] = ({ beforeDate, afterDate, isBetweenDate }) =>
  isBetweenDate.isBetween(beforeDate, afterDate)

const getDifference: MomentDateHandler['getDifference'] = ({ firstDate, secondDate, unitOfTime }) =>
  firstDate.diff(secondDate, unitOfTime as unitOfTime.Diff)

const addDays: MomentDateHandler['addDays'] = ({ days, date = newDate() }) => date.add(days, 'd')

const formatDate: MomentDateHandler['formatDate'] = ({ date, format = constants.defaultDateFormat }) => date.format(format)

const fromNow: MomentDateHandler['fromNow'] = ({ date }) => date.fromNow()

export const momentDateHandler: MomentDateHandler = {
  addDays,
  endOfDay,
  formatDate,
  isSame,
  isSameOrAfter,
  isSameOrBefore,
  isWeekend,
  isBefore,
  newDate,
  toDate,
  startOfDay,
  getDifference,
  isBetween,
  fromNow,
}
