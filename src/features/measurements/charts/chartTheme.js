import { formatDate } from '@/shared/lib/date';

export const CHART_COLORS = {
  ink: '#17171a',
  muted: '#9f9fa9',
  sun: '#fcf55f',
  grid: '#f1f1f3',
  axis: '#a1a1aa',
};

export const AXIS_PROPS = {
  stroke: CHART_COLORS.axis,
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

export const TIME_AXIS_PROPS = {
  ...AXIS_PROPS,
  dataKey: 'time',
  type: 'number',
  scale: 'time',
  domain: ['dataMin', 'dataMax'],
  tickFormatter: (time) => formatDate(time).slice(0, 6),
  minTickGap: 32,
};
