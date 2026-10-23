export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[11px] font-bold tracking-[0.18em] text-zinc-400 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-xl text-sm text-zinc-500">{description}</p>}
      </div>
      {action}
    </header>
  );
}
