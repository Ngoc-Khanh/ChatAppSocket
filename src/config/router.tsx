import { RouteObject } from "react-router-dom";
import { routes } from "./routes";
import GeneralError from "@/page/errors/general-error";
import NotFoundError from "@/page/errors/not-found-error";
import MaintenanceError from "@/page/errors/maintenance-error";
import UnanthorizedError from "@/page/errors/unauthorized-error";
import { Suspense } from "react";
import AuthLayout from "@/layouts/auth/auth.layout";
import { Loader2 } from "lucide-react";
import LoginPage from "@/page/auth/components/login-page";
import RegisterPage from "@/page/auth/components/register-page";
import MainLayout from "@/layouts/main";
import HomePage from "@/page/home";
import ConversationPage from "@/page/conversation/conversation";

export const reactRouter: RouteObject[] = [
  // AUTH ROUTERS
  {
    element: (
      <Suspense
        fallback={
          <div className="flex h-svh items-center justify-center overflow-hidden">
            <Loader2 className="h-10 w-full animate-spin items-center justify-center" />
          </div>
        }
      >
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: routes.register,
        element: <RegisterPage />,
      },
      {
        path: routes.forgotPassword,
        element: <div>Forgot Password</div>,
      }
    ],
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: routes.home,        
        element: <HomePage />,
      },
      {
        path: routes.conversation(":id"),
        element: <ConversationPage />,
      },
    ],
  },

  // ERROR ROUTERS
  { path: routes.generalError, Component: GeneralError },
  { path: routes.notfoundError, Component: NotFoundError },
  { path: routes.maintenanceError, Component: MaintenanceError },
  { path: routes.unauthorizedError, Component: UnanthorizedError },

  // FALLBACK 404 ERROR ROUTER
  { path: "*", Component: NotFoundError },
];
