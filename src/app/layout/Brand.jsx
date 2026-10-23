export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <img src="/carely-mark.svg" alt="" className="size-10 drop-shadow-sm" />
      <div>
        <p className="text-lg leading-none font-extrabold tracking-tight">Carely</p>
        <p className="mt-0.5 text-[11px] text-zinc-400">Personal health record</p>
      </div>
    </div>
  );
}
