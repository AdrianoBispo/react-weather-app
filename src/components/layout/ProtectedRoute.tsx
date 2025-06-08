import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "./Loader";

export function ProtectedRoute() {
  const { user, isAuthReady } = useAuth();

  // 1. Enquanto o Firebase verifica o estado de autenticação, mostramos um loader.
  if (!isAuthReady) {
    return <Loader isVisible={true} />;
  }

  // 2. Se a verificação terminou e o usuário está autenticado,
  //    renderizamos a rota filha (no nosso caso, o DashboardPage).
  //    O <Outlet /> é o placeholder onde a rota filha será renderizada.
  if (user) {
    return <Outlet />;
  }

  // 3. Se a verificação terminou e não há usuário,
  //    redirecionamos para a página de login.
  return <Navigate to="/login" replace />;
};
