import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

export function Header() {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
        Clima App
      </h1>
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="text-gray-600 dark:text-gray-300"
      >
        <LogOut className="mr-2 h-4 w-4" /> Sair
      </Button>
    </header>
  );
}
