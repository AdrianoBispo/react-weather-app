import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { AuthPage } from "@/pages/AuthPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Loader } from "@/components/layout/Loader";

// Um componente simples para redirecionar usuários já logados
const RedirectIfLoggedIn = () => {
  const { user, isAuthReady } = useAuth();
  if (!isAuthReady) return <Loader />;
  return user ? <Navigate to="/" replace /> : <AuthPage />;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública de Login */}
        {/* Se o usuário já estiver logado, ele será redirecionado para o dashboard */}
        <Route path="/login" element={<RedirectIfLoggedIn />} />

        {/* Rota Privada do Dashboard */}
        {/* O ProtectedRoute decide se mostra o Dashboard ou redireciona para /login */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
        </Route>

        {/* Rota de Fallback - Redireciona qualquer outra URL para a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
