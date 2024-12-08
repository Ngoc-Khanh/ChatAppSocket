import RouterProvider from "@/providers/router.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { UserProvider } from "@/providers/user.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <UserProvider>
          <RouterProvider />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
