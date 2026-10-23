import { motion } from 'framer-motion';

export function Card({ className = '', children, ...props }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`rounded-3xl border border-zinc-100 bg-white p-5 shadow-card ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function CardTitle({ title, hint, action }) {
  return (
    <header className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-bold tracking-tight">{title}</h3>
        {hint && <p className="mt-0.5 text-xs text-zinc-500">{hint}</p>}
      </div>
      {action}
    </header>
  );
}
