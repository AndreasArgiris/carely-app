import { IdCard } from 'lucide-react';
import { LatestMeasurements } from './LatestMeasurements';
import { NextVisitNote } from './NextVisitNote';
import { StatTile } from './StatTile';

export function ProfileSummary({ snapshot }) {
  const { profile } = snapshot;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-2xl border border-dashed border-zinc-200 px-3 py-2">
        <IdCard className="size-4 shrink-0 text-zinc-400" aria-hidden />
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
            Insurance no.
          </p>
          <p className="truncate font-mono text-xs font-semibold">
            {profile.insuranceNumber || '—'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatTile label="Age" value={snapshot.age} unit="yrs" />
        <StatTile label="Height" value={profile.heightCm} unit="cm" />
        <StatTile label="Weight" value={snapshot.weightKg} unit="kg" />
        <StatTile label="Body fat" value={snapshot.bodyFatPct} unit="%" />
        <StatTile label="BMI" value={snapshot.bmi} />
        <StatTile label="Lives in" value={profile.country} />
      </div>
      <LatestMeasurements
        latest={snapshot.latestMeasurement}
        latestByKind={snapshot.latestByKind}
      />
      <NextVisitNote appointment={snapshot.nextAppointment} />
    </div>
  );
}
