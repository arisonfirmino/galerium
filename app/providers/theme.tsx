"use client";

import { ThemeProvider as Theme } from "next-themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme attribute="class" defaultTheme="system" enableSystem>
      {children}
    </Theme>
  );
};

export default ThemeProvider;
