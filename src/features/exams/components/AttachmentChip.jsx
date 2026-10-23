import { FileText, Forward, X } from 'lucide-react';
import { formatFileSize } from '../lib/files';

const ICON_BUTTON =
  'grid size-5 place-items-center rounded-full text-zinc-500 hover:bg-sun-100 hover:text-ink';

export function AttachmentChip({ name, size, onOpen, onShare, onRemove }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300 py-1 pr-1.5 pl-3 text-xs">
      <FileText className="size-3.5 shrink-0" />
      {onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          className="truncate font-semibold decoration-sun-700 underline-offset-2 hover:text-sun-700 hover:underline"
        >
          {name}
        </button>
      ) : (
        <span className="truncate font-semibold">{name}</span>
      )}
      <span className="shrink-0 text-zinc-400">{formatFileSize(size)}</span>
      {onShare && (
        <button
          type="button"
          onClick={onShare}
          aria-label={`Share ${name}`}
          title={`Share ${name}`}
          className="text-zinc-500 transition duration-200 hover:text-ink active:scale-90"
        >
          <Forward className="size-3" />
        </button>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className={ICON_BUTTON}
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}
