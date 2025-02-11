import moment from 'moment'

type TProps = {
  x: number
  y: number
  payload: { value: number }
}

const XAxisTick = ({ x, y, payload: { value } }: TProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={25}
        dy={25}
        textAnchor="end"
        fill="var(--text-secondary)"
        transform="rotate(-35)"
      >
        {moment(value).format('MMM YYYY')}
      </text>
    </g>
  )
}

export { XAxisTick }
