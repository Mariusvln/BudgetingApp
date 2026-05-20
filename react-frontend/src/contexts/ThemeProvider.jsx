import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { ThemeContext } from "./ThemeContext";

const DEFAULT_THEME = "light";

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  const userThemeKey = user ? `theme:user:${user.id || user.email}` : null;
  const providerKey = userThemeKey || "guest";

  return (
    <ThemeStateProvider key={providerKey} userThemeKey={userThemeKey}>
      {children}
    </ThemeStateProvider>
  );
};

const ThemeStateProvider = ({ children, userThemeKey }) => {
  const [theme, setTheme] = useState(() =>
    userThemeKey ? localStorage.getItem(userThemeKey) || DEFAULT_THEME : DEFAULT_THEME,
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (userThemeKey) {
      localStorage.setItem(userThemeKey, theme);
    }
  }, [theme, userThemeKey]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
