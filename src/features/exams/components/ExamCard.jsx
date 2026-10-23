import { Paperclip, Stethoscope, Trash2 } from 'lucide-react';
import { formatDate } from '@/shared/lib/date';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { ExamAttachments } from './ExamAttachments';

export function ExamCard({ exam, onRemove }) {
  const hasFiles = exam.files.length > 0;

  return (
    <article className="relative ml-6 rounded-3xl border border-zinc-100 bg-white p-5 transition hover:shadow-card">
      <span className="absolute top-6 -left-[25px] size-3.5 rounded-full border-2 border-white bg-sun shadow-glow-sm ring-1 ring-ink" />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-zinc-400">{formatDate(exam.examDate)}</p>
          <h3 className="text-base font-bold">{exam.title}</h3>
          {exam.doctor && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
              <Stethoscope className="size-3.5" /> {exam.doctor}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasFiles && (
            <Badge tone="soft" icon={Paperclip}>
              {exam.files.length} PDF
            </Badge>
          )}
          <Button
            variant="danger"
            size="sm"
            aria-label="Delete exam"
            onClick={() => onRemove(exam.id)}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
      {exam.note && <p className="mt-3 text-sm whitespace-pre-line text-zinc-600">{exam.note}</p>}
      {hasFiles && <ExamAttachments exam={exam} />}
    </article>
  );
}
