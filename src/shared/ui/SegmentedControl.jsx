import { motion } from 'framer-motion';
import { useId } from 'react';

export function SegmentedControl({ options, value, onChange, label }) {
  const groupId = useId();

  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex flex-wrap rounded-full border border-zinc-100 bg-zinc-50 p-1"
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(option.value)}
            className="relative rounded-full px-3.5 py-1.5 text-xs font-semibold text-zinc-500 transition-colors duration-200 hover:text-ink aria-selected:text-ink"
          >
            {isSelected && (
              <motion.span
                layoutId={`segment-${groupId}`}
                className="absolute inset-0 rounded-full bg-sun shadow-glow-sm"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
