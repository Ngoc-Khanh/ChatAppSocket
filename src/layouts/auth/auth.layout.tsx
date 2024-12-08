import { useStateUser } from "@/providers/user.provider";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { token } = useStateUser();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
