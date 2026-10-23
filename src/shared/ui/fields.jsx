import { ChevronDown } from 'lucide-react';

const CONTROL =
  'w-full rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-zinc-400 outline-none transition focus:border-ink focus:shadow-glow-sm';

export function Field({ label, hint, className = '', children }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-zinc-600">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-zinc-400">{hint}</span>}
    </label>
  );
}

export function Input(props) {
  return <input className={CONTROL} {...props} />;
}

export function TextArea(props) {
  return <textarea rows={3} className={`${CONTROL} resize-none`} {...props} />;
}

export function Select({ options, ...props }) {
  return (
    <div className="relative">
      <select className={`${CONTROL} cursor-pointer appearance-none pr-11`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-zinc-500"
      />
    </div>
  );
}
