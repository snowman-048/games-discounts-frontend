import { TRegion } from '@/types/region.types'

type TProps = {
  x: number
  y: number
  payload: { value: number }
  region: TRegion
}

const YAxisTick = ({ x, y, payload: { value }, region }: TProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dx={-5} dy={5} textAnchor="end" fill="var(--color-inactive)">
        {region.currencySymbol}
        {value}
      </text>
    </g>
  )
}

export { YAxisTick }
