import { MapPin, Stethoscope } from 'lucide-react';
import { formatRelativeDay, formatTime } from '@/shared/lib/date';
import { Badge } from '@/shared/ui/Badge';
import { APPOINTMENT_CATEGORIES } from '../useAppointments';
import { AppointmentActions } from './AppointmentActions';

const STATUS_BADGE = {
  planned: { tone: 'sun', label: 'Planned' },
  completed: { tone: 'ink', label: 'Completed' },
  cancelled: { tone: 'muted', label: 'Cancelled' },
};

function DateBlock({ value, isHighlighted }) {
  const date = new Date(value);
  return (
    <div
      className={`flex w-16 shrink-0 flex-col items-center rounded-2xl py-2 ${isHighlighted ? 'bg-sun shadow-glow-sm' : 'bg-zinc-50'}`}
    >
      <span className="text-[10px] font-bold tracking-widest uppercase">
        {date.toLocaleString('en-GB', { month: 'short' })}
      </span>
      <span className="text-2xl leading-none font-extrabold">{date.getDate()}</span>
      <span className="mt-0.5 text-[11px] font-semibold text-zinc-600">{formatTime(value)}</span>
    </div>
  );
}

export function AppointmentCard({ appointment, isNext, onStatusChange, onRemove }) {
  const status = STATUS_BADGE[appointment.status];
  const category = APPOINTMENT_CATEGORIES.find((item) => item.value === appointment.category);
  const isPlanned = appointment.status === 'planned';

  return (
    <article
      className={`flex gap-4 rounded-3xl border bg-white p-4 transition ${isNext ? 'border-sun shadow-glow' : 'border-zinc-100 hover:shadow-card'} ${isPlanned ? '' : 'opacity-75'}`}
    >
      <DateBlock value={appointment.scheduledAt} isHighlighted={isPlanned} />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold">{appointment.title}</h3>
          <Badge tone={status.tone}>{status.label}</Badge>
          <Badge tone="neutral">{category?.label}</Badge>
          {isPlanned && (
            <span className="text-xs text-zinc-500">
              {formatRelativeDay(appointment.scheduledAt)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
          {appointment.doctor && (
            <span className="flex items-center gap-1">
              <Stethoscope className="size-3.5" /> {appointment.doctor}
            </span>
          )}
          {appointment.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" /> {appointment.location}
            </span>
          )}
        </div>
        {appointment.details && <p className="text-sm text-zinc-600">{appointment.details}</p>}
        <AppointmentActions
          appointment={appointment}
          onStatusChange={onStatusChange}
          onRemove={onRemove}
        />
      </div>
    </article>
  );
}
