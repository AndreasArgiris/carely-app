import { AnimatePresence, motion } from 'framer-motion';

export function Collapse({ isOpen, children }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pb-6">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
