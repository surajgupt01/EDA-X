import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    console.log("Loaded theme from localStorage:", saved);
    return saved === 'dark';
  });

  useEffect(() => {
    console.log("Applying theme:", theme ? 'dark' : 'light');
    const root = document.getElementById('root')
     if(root) root.classList.toggle('dark', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = !theme;
    console.log("Toggling theme to:", newTheme ? 'dark' : 'light');
    setTheme(newTheme);
    localStorage.setItem('color-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
