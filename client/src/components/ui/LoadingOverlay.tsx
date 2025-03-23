import { motion, AnimatePresence } from 'framer-motion';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 bg-primary flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white border-b-secondary rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-white font-heading font-semibold text-xl animate-pulse">Cargando Global Bids...</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
