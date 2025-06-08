import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { AuthPage } from "@/pages/AuthPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { Loader } from "@/components/layout/Loader";

export function App() {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <Loader />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={user ? "dashboard" : "auth"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {user ? <DashboardPage /> : <AuthPage />}
      </motion.div>
    </AnimatePresence>
  );
}
