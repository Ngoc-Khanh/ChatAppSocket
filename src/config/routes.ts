export const routes = {  
  // AUTH ROUTES
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  verifyPhone: "/verify-phone",
  
  // MAIN ROUTES
  home: "/",
  conversation: (id: string) => `/conversation/${id}`,


  // ERROR ROUTES
  generalError: "/500",
  notfoundError: "/404",
  maintenanceError: "/503",
  unauthorizedError: "/401",
};
