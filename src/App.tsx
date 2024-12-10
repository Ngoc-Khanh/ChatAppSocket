import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./providers/socket.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { UserProvider } from "@/providers/user.provider";
import RouterProvider from "@/providers/router.provider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <UserProvider>
          <SocketProvider>
            <RouterProvider />
          </SocketProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
