import { Forward } from 'lucide-react';
import { formatDate } from '@/shared/lib/date';
import { useShareFiles } from '../hooks/useShareFiles';
import { openAttachment } from '../lib/files';
import { AttachmentChip } from './AttachmentChip';

export function ExamAttachments({ exam }) {
  const { isShareSupported, shareFiles, statusMessage } = useShareFiles();
  const hasSeveralFiles = exam.files.length > 1;
  const shareLabel = hasSeveralFiles ? `Share all ${exam.files.length} PDFs` : 'Share PDF';

  const handleShare = (attachments) =>
    shareFiles({
      title: exam.title,
      text: `${exam.title} — ${formatDate(exam.examDate)}`,
      attachments,
    });

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {exam.files.map((file) => (
          <AttachmentChip
            key={file.id}
            name={file.name}
            size={file.size}
            onOpen={() => openAttachment(file)}
            onShare={isShareSupported && hasSeveralFiles ? () => handleShare([file]) : undefined}
          />
        ))}
        {isShareSupported && (
          <button
            type="button"
            aria-label={shareLabel}
            title={shareLabel}
            onClick={() => handleShare(exam.files)}
            className="p-1 text-zinc-500 transition duration-200 hover:text-ink active:scale-90"
          >
            <Forward className="size-3" />
          </button>
        )}
      </div>
      {statusMessage && (
        <p role="status" className="text-xs font-semibold text-zinc-500">
          {statusMessage}
        </p>
      )}
    </div>
  );
}
