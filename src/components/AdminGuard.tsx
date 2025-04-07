
import { Navigate, useLocation } from "react-router-dom";

type AdminGuardProps = {
  children: React.ReactNode;
};

const AdminGuard = ({ children }: AdminGuardProps) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("yapim-admin-auth") === "true";

  if (!isAuthenticated) {
    // Eğer kimlik doğrulanmamışsa, login sayfasına yönlendir
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
