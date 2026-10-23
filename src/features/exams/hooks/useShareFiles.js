import { useEffect, useState } from 'react';
import { canSharePdfs, toShareableFile } from '../lib/files';

export const SHARE_MESSAGES = {
  shared: 'Shared',
  error: "Couldn't open sharing on this device. Please try again.",
};

const STATUS_VISIBLE_MS = 5000;

/** Shares PDFs through the system share sheet. Only offered where supported. */
export function useShareFiles() {
  const [status, setStatus] = useState(null);

  // Timer: hide the status message after a few seconds.
  useEffect(() => {
    if (!status) return undefined;
    const timer = setTimeout(() => setStatus(null), STATUS_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const shareFiles = async ({ title, text, attachments }) => {
    try {
      await navigator.share({ title, text, files: attachments.map(toShareableFile) });
      setStatus('shared');
    } catch (error) {
      // AbortError = the user closed the share sheet; nothing went wrong.
      if (error.name !== 'AbortError') setStatus('error');
    }
  };

  return {
    isShareSupported: canSharePdfs(),
    shareFiles,
    statusMessage: status && SHARE_MESSAGES[status],
  };
}
