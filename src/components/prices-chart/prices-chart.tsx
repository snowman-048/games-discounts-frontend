'use client'

import { useMemo } from 'react'

import moment from 'moment'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { TGame } from '@/types/game.types'
import { TPriceHistory } from '@/types/price-history.types'

import { ChartTooltip } from './libs/components/chart-tooltip'
import { XAxisTick } from './libs/components/x-axis-tick'
import { YAxisTick } from './libs/components/y-axis-tick'
import { TLineConfig } from './libs/types/line-config.types'

type TProps = {
  game: TGame
  lines: TLineConfig[]
  height?: number
}

const getLinePriceKey = (index: number) => `price_${index}`
const getLineStoreKey = (index: number) => `store_${index}`

const getStoreFromPriceHistory = (priceHistory: TPriceHistory) =>
  priceHistory.meta?.type || priceHistory.store.name

const getClearDate = (date?: number | string) => moment(date).utc(true).valueOf()

const firstDayOfDataCollection = getClearDate(moment().set({ year: 2025, dayOfYear: 1 }).valueOf()) // There is no data before this date

const PricesChart = ({ game, lines, height = 300 }: TProps) => {
  const commonRegion = useMemo(() => lines?.[0]?.priceHistory?.[0]?.region, [lines])

  const mergedData = useMemo(() => {
    const now = getClearDate()
    const mergedDataMap = new Map<number, Record<string, any>>()

    const earliestPriceHistoryForLine = new Array(lines.length).fill(null)
    const latestPriceHistoryForLine = new Array(lines.length).fill(null)

    lines.forEach((line, index) => {
      const lineKey = getLinePriceKey(index)
      const storeKey = getLineStoreKey(index)

      line.priceHistory.forEach((item) => {
        const discountEndsValue = getClearDate(item.discountEnds)
        let discountEnds = discountEndsValue
        if (discountEnds >= now) {
          discountEnds = now
        }

        if (
          !earliestPriceHistoryForLine[index] ||
          getClearDate(earliestPriceHistoryForLine[index].discountStarts) >
            getClearDate(item.discountStarts)
        ) {
          earliestPriceHistoryForLine[index] = item
        }
        if (
          !latestPriceHistoryForLine[index] ||
          getClearDate(latestPriceHistoryForLine[index].discountEnds) <
            getClearDate(item.discountEnds)
        ) {
          latestPriceHistoryForLine[index] = item
        }

        const store = getStoreFromPriceHistory(item)

        const discountStartItem = {
          date: getClearDate(item.discountStarts),
          region: item.region,
          [lineKey]: item.initialPrice,
          [storeKey]: store,
        }

        const discountEndItem = {
          date: discountEnds,
          region: item.region,
          [lineKey]: item.discountedPrice,
          [storeKey]: store,
        }

        const discountItems = [discountStartItem, discountEndItem]

        discountItems.forEach((discountItem) => {
          if (!mergedDataMap.has(discountItem.date)) {
            lines.forEach((_, lineIndex) => {
              const newLineKey = getLinePriceKey(lineIndex)
              if (!discountItem[newLineKey]) {
                discountItem[newLineKey] = discountItem[lineKey]
              }
            })
            mergedDataMap.set(discountItem.date, discountItem)
          } else {
            const existingItem = mergedDataMap.get(discountItem.date)!
            existingItem[lineKey] = discountItem[lineKey]
            existingItem[storeKey] = discountItem[storeKey]
          }
        })
      })
    })

    const formatted = (Array.from(mergedDataMap.values()) || []).sort(
      (a, b) => a.date - b.date, // ASC
    )

    if (formatted.length) {
      const releaseYear = moment(game.releaseDate).year()
      // All the prices are collected starting from 2025
      const firstEntryDate =
        releaseYear >= 2025 ? moment(game.releaseDate).valueOf() : firstDayOfDataCollection

      if (formatted[0].date > firstEntryDate) {
        const firstItem: any = {
          date: firstEntryDate,
        }

        earliestPriceHistoryForLine.forEach((item, index) => {
          if (!item) {
            return
          }
          firstItem.region = item.region
          firstItem[getLinePriceKey(index)] = item.initialPrice
          firstItem[getLineStoreKey(index)] = item.meta?.type ? null : item.store.name
        })

        formatted.unshift(firstItem)
      }

      if (formatted[formatted.length - 1].date < now) {
        const lastItem: any = {
          date: now,
        }

        latestPriceHistoryForLine.forEach((item, index) => {
          if (!item) {
            return
          }
          lastItem.region = item.region
          lastItem[getLinePriceKey(index)] = item.initialPrice
          lastItem[getLineStoreKey(index)] = item.meta?.type ? null : item.store.name
        })

        formatted.push(lastItem)
      }
    }

    return formatted
  }, [lines])

  const ticks = useMemo(
    () =>
      mergedData
        // .map((item) => item.date as number)
        .reduce((acc, item) => {
          const currentYear = moment(item.date).year()
          const currentMonth = moment(item.date).month()
          const isSameMonthExists = acc.find(
            (accItem: any) =>
              moment(accItem).month() === currentMonth && moment(accItem).year() === currentYear,
          )
          if (!isSameMonthExists) {
            acc.push(item.date)
          }
          return acc
        }, [] as number[]) as number[],
    [mergedData],
  )

  return (
    <ResponsiveContainer style={{ flex: 1 }} width="100%" height={height}>
      <LineChart syncMethod="value" margin={{ bottom: 30, right: 40, left: 10, top: 5 }}>
        {lines.map((line, index) => (
          <Line
            key={index}
            type="stepBefore"
            dataKey={getLinePriceKey(index)}
            stroke={line.lineColor}
            data={mergedData}
            strokeWidth={4}
          />
        ))}
        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#555" />
        <XAxis
          dataKey="date"
          ticks={ticks}
          tick={(props) => <XAxisTick {...props} />}
          angle={-35}
          stroke="var(--color-inactive)"
          allowDuplicatedCategory={false}
        />
        <YAxis
          stroke="var(--color-inactive)"
          tick={(props) => <YAxisTick region={commonRegion} {...props} />}
        />
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltip
              active={active}
              payload={payload as any}
              priceAccessor={getLinePriceKey}
              storeAccessor={getLineStoreKey}
            />
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export { PricesChart }
