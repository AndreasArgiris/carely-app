import { createId } from '@/shared/lib/id';

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

export function isPdf(file) {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

/** IndexedDB can store Blobs directly, so the File itself is kept. */
export function toAttachment(file) {
  return { id: createId(), name: file.name, size: file.size, blob: file };
}

export function openAttachment(attachment) {
  const url = URL.createObjectURL(attachment.blob);
  window.open(url, '_blank', 'noopener');
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/** A real File with a PDF type, which the Web Share API requires. */
export function toShareableFile(attachment) {
  return new File([attachment.blob], attachment.name, { type: 'application/pdf' });
}

/** True on browsers that can hand PDFs to the system share sheet (Chrome, Edge, mobile Safari…). */
export function canSharePdfs(files = [new File([''], 'probe.pdf', { type: 'application/pdf' })]) {
  return (
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files })
  );
}
