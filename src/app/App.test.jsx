import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('App', () => {
  it('renders the overview, info panel and navigates between tabs', async () => {
    render(<App />);

    expect(await screen.findByText('Blood pressure standards')).toBeInTheDocument();
    expect(await screen.findByText(/next exam or visit/i)).toBeInTheDocument();
    expect(await screen.findByText('Leg vein ultrasound')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /medications/i }));
    expect(await screen.findByText('Amlodipine')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /general notes/i }));
    expect(await screen.findByText(/feel a little dizzy/i)).toBeInTheDocument();
  });

  it('closes an open add form when switching tabs', async () => {
    render(<App />);

    await userEvent.click(await screen.findByRole('link', { name: /medications/i }));
    await userEvent.click(await screen.findByRole('button', { name: /add medication/i }));
    expect(await screen.findByPlaceholderText('e.g. Ibuprofen')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /exam history/i }));
    expect(await screen.findByText('Medical exam history')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /medications/i }));
    expect(await screen.findByText('Amlodipine')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('e.g. Ibuprofen')).not.toBeInTheDocument();
  });

  it('shows the latest measurement in the info panel and at the top of the history', async () => {
    render(<App />);

    expect(await screen.findByText(/Latest · /)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('link', { name: /^measurements$/i }));
    const history = await screen.findByRole('region', { name: 'Measurement history' });
    expect(within(history).getAllByRole('listitem')[0]).toHaveTextContent('Latest');
  });

  it('shows charts only on a category tab, not on "All"', async () => {
    render(<App />);
    await userEvent.click(await screen.findByRole('link', { name: /^measurements$/i }));
    await screen.findByRole('region', { name: 'Measurement history' });

    expect(screen.queryByRole('heading', { name: 'Blood pressure' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('tab', { name: 'Blood pressure' }));
    expect(await screen.findByRole('heading', { name: 'Blood pressure' })).toBeInTheDocument();
  });

  it('rejects planned visits in the past', async () => {
    render(<App />);
    await userEvent.click(await screen.findByRole('link', { name: /^planned visits$/i }));
    await userEvent.click(await screen.findByRole('button', { name: /plan new/i }));

    fireEvent.change(screen.getByLabelText('Date & time'), {
      target: { value: '2020-01-01T10:00' },
    });
    expect(screen.getByRole('alert')).toHaveTextContent(/must be in the future/i);
    expect(screen.getByRole('button', { name: 'Schedule' })).toBeDisabled();
  });
});
