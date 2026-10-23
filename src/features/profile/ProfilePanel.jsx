import { Pencil } from 'lucide-react';
import { useToggle } from '@/shared/hooks/useToggle';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { ProfileEditForm } from './components/ProfileEditForm';
import { ProfileSummary } from './components/ProfileSummary';
import { useHealthSnapshot } from './useHealthSnapshot';
import { useProfile } from './useProfile';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export function ProfilePanel() {
  const snapshot = useHealthSnapshot();
  const { saveProfile } = useProfile();
  const editor = useToggle();
  const { profile } = snapshot;

  const handleSave = async (nextProfile) => {
    await saveProfile(nextProfile);
    editor.close();
  };

  return (
    <Card className="xl:sticky xl:top-6">
      <header className="mb-5 flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun text-sm font-extrabold shadow-glow">
          {getInitials(profile.fullName)}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-extrabold">{profile.fullName}</h2>
          <p className="text-xs text-zinc-500 capitalize">
            {profile.sex} · Blood {profile.bloodType || '—'}
          </p>
        </div>
        {!editor.isOn && (
          <Button variant="ghost" size="sm" aria-label="Edit profile" onClick={editor.toggle}>
            <Pencil className="size-3.5" />
          </Button>
        )}
      </header>
      {editor.isOn ? (
        <ProfileEditForm profile={profile} onSave={handleSave} onCancel={editor.close} />
      ) : (
        <ProfileSummary snapshot={snapshot} />
      )}
    </Card>
  );
}
