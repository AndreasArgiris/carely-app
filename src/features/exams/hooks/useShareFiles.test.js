import { act, renderHook } from '@testing-library/react';
import { SHARE_MESSAGES, useShareFiles } from './useShareFiles';

const attachment = { id: '1', name: 'results.pdf', size: 8, blob: new Blob(['%PDF-1.4']) };
const request = {
  title: 'Blood test',
  text: 'Blood test — 01 Oct 2026',
  attachments: [attachment],
};

const supportSharing = (share = () => Promise.resolve()) => {
  navigator.canShare = vi.fn(() => true);
  navigator.share = vi.fn(share);
};

describe('useShareFiles', () => {
  afterEach(() => {
    delete navigator.canShare;
    delete navigator.share;
    vi.useRealTimers();
  });

  it('reports no support without the Web Share API', () => {
    const { result } = renderHook(() => useShareFiles());
    expect(result.current.isShareSupported).toBe(false);
  });

  it('shares attachments as PDF files and confirms', async () => {
    supportSharing();
    const { result } = renderHook(() => useShareFiles());
    expect(result.current.isShareSupported).toBe(true);

    await act(() => result.current.shareFiles(request));

    const shared = navigator.share.mock.calls[0][0];
    expect(shared).toMatchObject({ title: request.title, text: request.text });
    expect(shared.files[0]).toBeInstanceOf(File);
    expect(shared.files[0]).toMatchObject({ name: 'results.pdf', type: 'application/pdf' });
    expect(result.current.statusMessage).toBe(SHARE_MESSAGES.shared);
  });

  it('hides the status message after five seconds', async () => {
    vi.useFakeTimers();
    supportSharing();
    const { result } = renderHook(() => useShareFiles());

    await act(() => result.current.shareFiles(request));
    act(() => vi.advanceTimersByTime(4999));
    expect(result.current.statusMessage).toBe(SHARE_MESSAGES.shared);

    act(() => vi.advanceTimersByTime(1));
    expect(result.current.statusMessage).toBeNull();
  });

  it('explains when sharing fails', async () => {
    supportSharing(() => Promise.reject(new DOMException('blocked', 'NotAllowedError')));
    const { result } = renderHook(() => useShareFiles());

    await act(() => result.current.shareFiles(request));

    expect(result.current.statusMessage).toBe(SHARE_MESSAGES.error);
  });

  it('stays quiet when the user closes the share sheet', async () => {
    supportSharing(() => Promise.reject(new DOMException('closed', 'AbortError')));
    const { result } = renderHook(() => useShareFiles());

    await act(() => result.current.shareFiles(request));

    expect(result.current.statusMessage).toBeNull();
  });
});
