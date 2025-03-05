"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { SunIcon, MoonIcon, LoaderCircleIcon } from "lucide-react";

const ThemeSwitch = () => {
  const [mouted, setMouted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMouted(true), []);

  if (!mouted)
    return (
      <LoaderCircleIcon
        size={16}
        className="text-muted-foreground order-1 animate-spin md:order-2"
      />
    );

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="order-1 flex cursor-pointer items-center justify-center rounded-2xl md:order-2 md:h-10 md:w-10"
    >
      {resolvedTheme === "dark" && <MoonIcon size={16} />}
      {resolvedTheme === "light" && <SunIcon size={16} />}
    </button>
  );
};

export default ThemeSwitch;
