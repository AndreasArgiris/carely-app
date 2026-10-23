import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formatFrequency } from '../useMedications';
import { MedicationCard } from './MedicationCard';

const medication = {
  id: 'med-1',
  name: 'Amlodipine',
  dose: '5 mg',
  frequencyCount: 1,
  frequencyPeriod: 'day',
  purpose: 'Blood pressure',
  sideEffects: 'Ankle swelling',
  startedAt: '2026-01-10T08:00',
  completedAt: null,
};

const renderCard = (overrides = {}, handlers = {}) =>
  render(
    <MedicationCard
      medication={{ ...medication, ...overrides }}
      onComplete={handlers.onComplete ?? vi.fn()}
      onResume={handlers.onResume ?? vi.fn()}
      onRemove={vi.fn()}
    />,
  );

describe('MedicationCard', () => {
  it('marks an active medication as completed', async () => {
    const onComplete = vi.fn();
    renderCard({}, { onComplete });

    expect(screen.getByText('Still taking')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /mark completed/i }));
    expect(onComplete).toHaveBeenCalledWith('med-1', expect.any(String));
  });

  it('shows start and completion dates for a finished course', () => {
    renderCard({ completedAt: '2026-01-17T20:00' });

    expect(screen.getByText('Completed', { selector: 'dt' })).toBeInTheDocument();
    expect(screen.getByText(/17 Jan 2026/)).toBeInTheDocument();
    expect(screen.getByText(/10 Jan 2026/)).toBeInTheDocument();
  });
});

describe('formatFrequency', () => {
  it('reads naturally', () => {
    expect(formatFrequency(1, 'day')).toBe('Once a day');
    expect(formatFrequency(3, 'day')).toBe('3 times a day');
    expect(formatFrequency(1, 'month')).toBe('Once a month');
    expect(formatFrequency(1, 'as-needed')).toBe('As needed');
  });
});
