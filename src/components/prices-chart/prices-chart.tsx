'use client'

import { useMemo } from 'react'

import { Grid2 } from '@mui/material'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

import { TGame } from '@/types/game.types'

import { ChartTooltip } from './libs/components/chart-tooltip'
import { XAxisTick } from './libs/components/x-axis-tick'
import { YAxisTick } from './libs/components/y-axis-tick'
import { TLineConfig } from './libs/types/line-config.types'
import { TPriceChartData } from './libs/types/price-chart-data.types'

type TProps = {
  game: TGame
  lines: TLineConfig[]
}

type TChartData = {
  data: TPriceChartData[]
  lineColor: string
  maxPrice: number
  lowestPrice: number
}[]

const PricesChartComponent = ({ game, lines }: TProps) => {
  const commonRegion = useMemo(() => lines?.[0]?.priceHistory?.[0]?.region, [lines])

  const formattedLines: TChartData = useMemo(() => {
    const now = moment().utc(true).startOf('day').valueOf()
    return lines.map((line) => {
      let hasActiveDiscount = false
      let maxPrice = line.priceHistory[0]?.initialPrice
      let lowestPrice = line.priceHistory[0]?.discountedPrice

      const formatted = line.priceHistory
        .map((item) => {
          if (item.initialPrice > maxPrice) {
            maxPrice = item.initialPrice
          }
          if (item.discountedPrice < lowestPrice) {
            lowestPrice = item.discountedPrice
          }

          let discountEnds
          if (moment(item.discountEnds).valueOf() > now) {
            discountEnds = moment().toISOString()
            hasActiveDiscount = true
          } else {
            discountEnds = item.discountEnds
          }
          const region = item.region
          return [
            {
              date: moment(item.discountStarts).utc(true).valueOf(),
              price: item.initialPrice,
              region,
              historyItem: item,
            },
            {
              date: moment(discountEnds).utc(true).valueOf(),
              price: item.discountedPrice,
              region,
              historyItem: item,
            },
          ]
        })
        .flat()
        .sort(
          (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf(), // ASC
        )

      if (formatted.length) {
        const releaseYear = moment(game.releaseDate).year()
        // All the prices are collected starting from 2025
        const firstEntryDate =
          releaseYear >= 2025
            ? moment(game.releaseDate).valueOf()
            : moment().set({ year: 2025, dayOfYear: 1 }).valueOf()

        formatted.unshift({
          ...formatted[0],
          date: firstEntryDate,
        })

        const lastItem = formatted[formatted.length - 1]
        if (!hasActiveDiscount) {
          formatted.push({
            ...lastItem,
            price: lastItem.historyItem.initialPrice,
            date: moment().endOf('day').valueOf(),
          })
        }
      }

      return {
        lineColor: line.lineColor || '#fff',
        data: formatted,
        maxPrice,
        lowestPrice,
      }
    })
  }, [lines])

  return (
    <Grid2 container alignItems="center">
      <LineChart
        width={800}
        height={300}
        syncMethod="value"
        margin={{ bottom: 30, right: 40, top: 20, left: 10 }}
      >
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
    </Grid2>
  )
}

const PricesChart = dynamic(() => Promise.resolve(PricesChartComponent), {
  ssr: false,
})

export { PricesChart }
