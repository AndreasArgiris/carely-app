import { Ban, Check, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/Button';

export function AppointmentActions({ appointment, onStatusChange, onRemove }) {
  const isPlanned = appointment.status === 'planned';
  const handleStatus = (status) => onStatusChange(appointment.id, status);

  return (
    <div className="flex flex-wrap gap-2">
      {isPlanned ? (
        <>
          <Button size="sm" onClick={() => handleStatus('completed')}>
            <Check className="size-3.5" /> Completed
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleStatus('cancelled')}>
            <Ban className="size-3.5" /> Cancel
          </Button>
        </>
      ) : (
        <Button size="sm" variant="outline" onClick={() => handleStatus('planned')}>
          <RotateCcw className="size-3.5" /> Reopen
        </Button>
      )}
      <Button
        size="sm"
        variant="danger"
        aria-label="Delete appointment"
        onClick={() => onRemove(appointment.id)}
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}
