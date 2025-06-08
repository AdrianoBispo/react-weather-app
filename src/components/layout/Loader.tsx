import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
        >
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
