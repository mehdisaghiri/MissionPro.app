"use client";
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/Components/ui/switch';
import { useTheme } from '@/context/themeContext';

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        {isDark ? (
          <Moon className="w-4 h-4 text-blue-400" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
        <span className="text-sm font-medium">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </div>
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-[#7263f3] data-[state=unchecked]:bg-gray-300"
      />
    </div>
  );
};

export default ThemeSwitch;
