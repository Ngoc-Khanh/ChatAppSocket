import { useTheme } from "@/providers/theme.provider";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const ModeToggleSwitch = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        {theme === 'light' ? (
          <>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <span className="text-sm">Light mode</span>  
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="text-sm">Dark mode</span>
          </>
        )}
      </div>
      <Switch
        id="theme-toggle"
        checked={theme === 'light'}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}