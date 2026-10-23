export function Toolbar({ children }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-zinc-100 bg-white px-4 py-3">
      {children}
    </div>
  );
}
