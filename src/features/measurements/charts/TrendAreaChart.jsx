import { useId } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AXIS_PROPS, CHART_COLORS, TIME_AXIS_PROPS } from './chartTheme';
import { ChartTooltip } from './ChartTooltip';

export function TrendAreaChart({ data, dataKey, name, unit, band, height = 220 }) {
  const gradientId = `trend-${useId().replace(/:/g, '')}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS.sun} stopOpacity={0.9} />
            <stop offset="100%" stopColor={CHART_COLORS.sun} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
        <XAxis {...TIME_AXIS_PROPS} />
        <YAxis {...AXIS_PROPS} domain={['dataMin - 2', 'dataMax + 2']} allowDecimals={false} />
        {band && (
          <ReferenceArea
            y1={band.from}
            y2={band.to}
            fill={CHART_COLORS.grid}
            fillOpacity={0.7}
            ifOverflow="hidden"
          />
        )}
        <Tooltip
          content={<ChartTooltip unit={unit} />}
          cursor={{ stroke: CHART_COLORS.axis, strokeDasharray: '3 3' }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          name={name}
          stroke={CHART_COLORS.ink}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 5, fill: CHART_COLORS.sun, stroke: CHART_COLORS.ink, strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
