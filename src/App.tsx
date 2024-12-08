import RouterProvider from "@/providers/router.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { UserProvider } from "@/providers/user.provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <UserProvider>
        <RouterProvider />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
