import { AuthForm } from "@/components/auth/AuthForm";
import { motion } from "framer-motion";

export function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AuthForm />
      </motion.div>
    </div>
  );
}
