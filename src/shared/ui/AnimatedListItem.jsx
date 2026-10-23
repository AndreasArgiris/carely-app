import { motion } from 'framer-motion';

export function AnimatedListItem({ children, className = '' }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className={className}
    >
      {children}
    </motion.li>
  );
}
