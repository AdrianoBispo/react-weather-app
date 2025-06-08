import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { CloudAlert, LogOut } from "lucide-react";

export function Header() {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="flex justify-between items-center">
      <h1 className="flex flex-row items-center gap-1 text-md sm:text-3xl font-bold dark:text-white">
        <CloudAlert size={48} color="#EF4800"/> React Weather App
      </h1>
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="text-gray-600 dark:text-gray-300"
      >
        <LogOut /> Sair
      </Button>
    </header>
  );
}
