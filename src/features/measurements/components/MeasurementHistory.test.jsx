import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MeasurementHistory } from './MeasurementHistory';

const readings = Array.from({ length: 23 }, (_, index) => ({
  id: `m-${index}`,
  kind: 'glucose',
  glucose: 100 + index,
  context: 'fasting',
  recordedAt: new Date(2026, 9, 23 - index, 8).toISOString(),
  note: '',
}));

const rowCount = () => within(screen.getAllByRole('list')[0]).getAllByRole('listitem').length;

describe('MeasurementHistory', () => {
  it('shows 10 measurements per page and pages through them', async () => {
    render(<MeasurementHistory items={readings} onRemove={vi.fn()} />);

    expect(rowCount()).toBe(10);
    expect(screen.getByText('1–10')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    expect(rowCount()).toBe(3);
    expect(screen.getByText('21–23')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();

    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(screen.getByText('11–20')).toBeInTheDocument();
  });
});
