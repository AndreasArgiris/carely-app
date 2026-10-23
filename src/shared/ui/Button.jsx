import { motion } from 'framer-motion';

const VARIANTS = {
  primary:
    'border border-sun bg-sun text-ink shadow-glow-sm hover:border-sun-400 hover:bg-sun-400 hover:shadow-glow',
  outline: 'border border-zinc-200 bg-white text-ink hover:border-ink hover:bg-zinc-50',
  ghost: 'text-zinc-600 hover:bg-sun-50 hover:text-ink',
  danger: 'text-zinc-500 hover:bg-red-50 hover:text-red-700',
};

const SIZES = {
  sm: 'h-8 gap-1.5 px-3 text-xs',
  md: 'h-10 gap-2 px-4 text-sm',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold transition-[box-shadow,background-color,border-color,color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-40 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
