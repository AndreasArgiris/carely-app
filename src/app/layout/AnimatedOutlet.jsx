import { motion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

/**
 * Enter-only page transition. Keying by pathname unmounts the previous page
 * immediately, so open forms reset to preview mode and the next tab never
 * waits on an exit animation that a nested AnimatePresence can stall.
 */
export function AnimatedOutlet() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {outlet}
    </motion.div>
  );
}
