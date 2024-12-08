import { useStateUser } from "@/providers/user.provider";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
  const { token } = useStateUser();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Toaster richColors />
      <Outlet />
    </div>
  );
}
