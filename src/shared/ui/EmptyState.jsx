export function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-zinc-200 px-6 py-12 text-center">
      {Icon && (
        <span className="mb-3 grid size-12 place-items-center rounded-2xl bg-sun-50 shadow-glow-sm">
          <Icon className="size-5" />
        </span>
      )}
      <p className="text-sm font-bold">{title}</p>
      {text && <p className="mt-1 max-w-xs text-xs text-zinc-500">{text}</p>}
    </div>
  );
}
