"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/app/components/ui/button";

import { SunIcon, MoonIcon, LoaderCircleIcon } from "lucide-react";

const ThemeSwitch = () => {
  const [mouted, setMouted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMouted(true), []);

  if (!mouted)
    return (
      <LoaderCircleIcon
        size={16}
        className="animate-spin text-muted-foreground"
      />
    );

  return (
    <Button
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" && <MoonIcon size={16} />}
      {resolvedTheme === "light" && <SunIcon size={16} />}
    </Button>
  );
};

export default ThemeSwitch;
