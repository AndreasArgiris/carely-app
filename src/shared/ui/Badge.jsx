const TONES = {
  sun: 'bg-sun text-ink',
  soft: 'bg-sun-50 text-sun-700 ring-1 ring-sun-300',
  neutral: 'bg-zinc-100 text-zinc-600',
  ink: 'bg-ink text-white',
  muted: 'bg-white text-zinc-400 ring-1 ring-zinc-200',
};

export function Badge({ tone = 'neutral', icon: Icon, children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${TONES[tone]}`}
    >
      {Icon && <Icon className="size-3" />}
      {children}
    </span>
  );
}
