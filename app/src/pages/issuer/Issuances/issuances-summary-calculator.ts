export const getIssuanceSummary = (ratesheets: any[]) => {
  const eois = ratesheets.flatMap(({ indicativeOptions }) => indicativeOptions.flatMap(({ eois }) => eois))
  const summaryTargets = { eois: 0, offers: 0, accepted: 0, rejected: 0 }

  return eois.reduce((summary, eoi) => {
    summary.eois += eoi?.maxValue ? +eoi.maxValue : 0
    summary.offers += eoi?.effectiveAmount ? +eoi.effectiveAmount : 0

    if (Object.keys(summaryTargets).includes(eoi?.status)) {
      summary[eoi.status] += eoi?.effectiveAmount ? +eoi.effectiveAmount : 0
    }

    return summary
  }, summaryTargets)
}

export const sumTargetValues = ({ tableItems }) =>
  tableItems.reduce((totalTargetValue, tableItem) => totalTargetValue + +tableItem.targetValue, 0)
