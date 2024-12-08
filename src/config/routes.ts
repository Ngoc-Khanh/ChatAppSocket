export const routes = {
  home: "/",
  room: (id: string) => `/room/${id}`,

  // AUTH ROUTES
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  verifyPhone: "/verify-phone",
  
  // MAIN ROUTES
  


  // ERROR ROUTES
  generalError: "/500",
  notfoundError: "/404",
  maintenanceError: "/503",
  unauthorizedError: "/401",
};
