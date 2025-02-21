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

import { ChartTooltip } from './libs/components/chart-tooltip'
import { XAxisTick } from './libs/components/x-axis-tick'
import { YAxisTick } from './libs/components/y-axis-tick'
import { TLineConfig } from './libs/types/line-config.types'
import { TPriceChartData } from './libs/types/price-chart-data.types'

type TProps = {
  game: TGame
  lines: TLineConfig[]
  height?: number
}

type TChartData = {
  data: TPriceChartData[]
  lineColor: string
}[]

const getClearDate = (date?: number | string) =>
  moment(date).utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).valueOf()

const firstDayOfDataCollection = getClearDate(moment().set({ year: 2025, dayOfYear: 1 }).valueOf()) // There is no data before this date

const PricesChart = ({ game, lines, height = 300 }: TProps) => {
  const commonRegion = useMemo(() => lines?.[0]?.priceHistory?.[0]?.region, [lines])

  const formattedLines: TChartData = useMemo(() => {
    const endOfToday = getClearDate(moment().utc(true).endOf('day').valueOf())
    return lines.map((line) => {
      let hasActiveDiscount = false

      const formatted = line.priceHistory
        .flatMap((item) => {
          const discountEndsValue = getClearDate(item.discountEnds)
          let discountEnds = discountEndsValue
          if (discountEnds >= endOfToday) {
            discountEnds = endOfToday
            hasActiveDiscount = true
          }
          const region = item.region
          return [
            {
              date: getClearDate(item.discountStarts),
              price: item.initialPrice,
              region,
              historyItem: item,
            },
            {
              date: discountEnds,
              price: item.discountedPrice,
              region,
              historyItem: item,
            },
          ]
        })
        .sort(
          (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf(), // ASC
        )

      if (formatted.length) {
        const releaseYear = moment(game.releaseDate).year()
        // All the prices are collected starting from 2025
        const firstEntryDate =
          releaseYear >= 2025 ? moment(game.releaseDate).valueOf() : firstDayOfDataCollection

        formatted.unshift({
          ...formatted[0],
          date: firstEntryDate,
        })

        if (!hasActiveDiscount) {
          const lastItem = formatted[formatted.length - 1]
          formatted.push({
            ...lastItem,
            price: lastItem.historyItem.initialPrice,
            date: endOfToday,
          })
        }
      }

      return {
        lineColor: line.lineColor || '#fff',
        data: formatted,
      }
    })
  }, [lines])

  return (
    <ResponsiveContainer style={{ flex: 1 }} width="100%" height={height}>
      <LineChart syncMethod="value" margin={{ bottom: 30, right: 40, left: 10, top: 5 }}>
        {formattedLines.map((line, index) => (
          <Line
            key={index}
            type="stepBefore"
            dataKey="price"
            stroke={line.lineColor}
            data={line.data}
            strokeWidth={4}
          />
        ))}
        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#555" />
        <XAxis
          dataKey="date"
          ticks={formattedLines
            .map((item) => item.data.map((dataItem) => dataItem.date))
            .flat()
            .reduce((acc, date) => {
              const currentYear = moment(date).year()
              const currentMonth = moment(date).month()
              const isSameMonthExists = acc.find(
                (item) =>
                  moment(item).month() === currentMonth && moment(item).year() === currentYear,
              )
              if (!isSameMonthExists) {
                acc.push(date)
              }
              return acc
            }, [] as number[])}
          tick={(props) => <XAxisTick {...props} />}
          angle={-35}
          stroke="var(--text-secondary)"
          allowDuplicatedCategory={false}
        />
        <YAxis
          stroke="var(--text-secondary)"
          tick={(props) => <YAxisTick region={commonRegion} {...props} />}
        />
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltip active={active} payload={payload as any} />
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export { PricesChart }
