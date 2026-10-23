import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AXIS_PROPS, CHART_COLORS, TIME_AXIS_PROPS } from './chartTheme';
import { ChartTooltip } from './ChartTooltip';

const SERIES = [
  { dataKey: 'systolic', name: 'Systolic', color: CHART_COLORS.ink, limit: 120 },
  { dataKey: 'diastolic', name: 'Diastolic', color: CHART_COLORS.muted, limit: 80 },
];

function BloodPressureLegend() {
  return (
    <ul className="mb-2 flex gap-4 text-xs text-zinc-500">
      {SERIES.map((series) => (
        <li key={series.dataKey} className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full" style={{ background: series.color }} />
          {series.name}
        </li>
      ))}
      <li className="flex items-center gap-1.5">
        <span className="h-0 w-4 border-t-2 border-dashed border-sun-700" />
        Normal limit
      </li>
    </ul>
  );
}

export function BloodPressureChart({ data, height = 240 }) {
  return (
    <div>
      <BloodPressureLegend />
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
          <XAxis {...TIME_AXIS_PROPS} />
          <YAxis {...AXIS_PROPS} domain={[60, 'dataMax + 8']} allowDecimals={false} />
          {SERIES.map((series) => (
            <ReferenceLine
              key={series.limit}
              y={series.limit}
              stroke="#8a8410"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
          ))}
          <Tooltip
            content={<ChartTooltip unit="mmHg" />}
            cursor={{ stroke: CHART_COLORS.axis, strokeDasharray: '3 3' }}
          />
          {SERIES.map((series) => (
            <Line
              key={series.dataKey}
              type="monotone"
              dataKey={series.dataKey}
              name={series.name}
              stroke={series.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: CHART_COLORS.sun, stroke: series.color, strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
