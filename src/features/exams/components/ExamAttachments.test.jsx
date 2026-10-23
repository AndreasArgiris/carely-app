import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExamAttachments } from './ExamAttachments';

const pdf = (name) => ({
  id: name,
  name,
  size: 2048,
  blob: new Blob(['%PDF-1.4'], { type: 'application/pdf' }),
});

const exam = {
  title: 'Blood test',
  examDate: '2026-10-01',
  files: [pdf('results.pdf'), pdf('report.pdf')],
};

const supportSharing = (share = () => Promise.resolve()) => {
  navigator.canShare = vi.fn(() => true);
  navigator.share = vi.fn(share);
};

describe('ExamAttachments', () => {
  afterEach(() => {
    delete navigator.canShare;
    delete navigator.share;
  });

  it('hides sharing on browsers that cannot share files', () => {
    render(<ExamAttachments exam={exam} />);

    expect(screen.getByText('results.pdf')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /share/i })).not.toBeInTheDocument();
  });

  it('shares all PDFs of an exam through the system share sheet', async () => {
    supportSharing();
    render(<ExamAttachments exam={exam} />);

    await userEvent.click(screen.getByRole('button', { name: 'Share all 2 PDFs' }));

    const shared = navigator.share.mock.calls[0][0];
    expect(shared.title).toBe('Blood test');
    expect(shared.files.map((file) => file.name)).toEqual(['results.pdf', 'report.pdf']);
    expect(shared.files[0].type).toBe('application/pdf');
  });

  it('shares a single file from its chip', async () => {
    supportSharing();
    render(<ExamAttachments exam={exam} />);

    await userEvent.click(screen.getByRole('button', { name: 'Share report.pdf' }));

    const names = navigator.share.mock.calls[0][0].files.map((file) => file.name);
    expect(names).toEqual(['report.pdf']);
  });

  it('explains when the device refuses to open the share sheet', async () => {
    supportSharing(() => Promise.reject(new DOMException('blocked', 'NotAllowedError')));
    render(<ExamAttachments exam={exam} />);

    await userEvent.click(screen.getByRole('button', { name: 'Share all 2 PDFs' }));

    expect(await screen.findByRole('status')).toHaveTextContent(/couldn't open sharing/i);
  });

  it('stays quiet when the user closes the share sheet', async () => {
    supportSharing(() => Promise.reject(new DOMException('closed', 'AbortError')));
    render(<ExamAttachments exam={exam} />);

    await userEvent.click(screen.getByRole('button', { name: 'Share all 2 PDFs' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
