const DAY_MS = 86_400_000;

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});
const timeFormatter = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });
const relativeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const pad = (value) => String(value).padStart(2, '0');

export function formatDate(value) {
  return value ? dateFormatter.format(new Date(value)) : '—';
}

export function formatTime(value) {
  return value ? timeFormatter.format(new Date(value)) : '';
}

export function formatDateTime(value) {
  return value ? `${formatDate(value)}, ${formatTime(value)}` : '—';
}

export function toInputDate(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function toInputDateTime(date = new Date()) {
  return `${toInputDate(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function daysFromToday(offset) {
  return toInputDate(new Date(Date.now() + offset * DAY_MS));
}

export function startOfDay(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function formatRelativeDay(value, now = new Date()) {
  const diffDays = Math.round((startOfDay(value) - startOfDay(now)) / DAY_MS);
  return relativeFormatter.format(diffDays, 'day');
}

export function calculateAge(birthDate, now = new Date()) {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const hadBirthday =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  return now.getFullYear() - birth.getFullYear() - (hadBirthday ? 0 : 1);
}

export function isWithinRange(value, from, to) {
  const time = new Date(value).getTime();
  if (from && time < new Date(`${from}T00:00`).getTime()) return false;
  if (to && time > new Date(`${to}T23:59:59`).getTime()) return false;
  return true;
}

export function formatDuration(from, to = new Date()) {
  const days = Math.max(0, Math.round((new Date(to) - new Date(from)) / DAY_MS));
  if (days < 1) return 'less than a day';
  if (days < 60) return `${days} day${days === 1 ? '' : 's'}`;
  return `${Math.round(days / 30)} months`;
}

export function sortByDateDesc(items, getDate) {
  return [...items].sort((a, b) => new Date(getDate(b)) - new Date(getDate(a)));
}
