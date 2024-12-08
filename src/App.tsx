import RouterProvider from "@/providers/router.provider";
import { ThemeProvider } from "@/providers/theme.provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <RouterProvider />
    </ThemeProvider>
  );
}

export default App;
