import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  suggestion: { type: "clothing" | "activity"; text: string } | null;
  isLoading: boolean;
}

export function GeminiSuggestions({ suggestion, isLoading }: Props) {
  const cardVariants = {
    clothing: "bg-purple-50 dark:bg-purple-900/30",
    activity: "bg-teal-50 dark:bg-teal-900/30",
  };

  return (
    <AnimatePresence>
      {(isLoading || suggestion) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6"
        >
          {isLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            suggestion && (
              <Card className={`p-4 ${cardVariants[suggestion.type]}`}>
                <div className="whitespace-pre-line">{suggestion.text}</div>
              </Card>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
