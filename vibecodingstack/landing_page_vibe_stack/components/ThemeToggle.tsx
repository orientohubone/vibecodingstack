import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        fixed top-6 right-6 z-50 p-3 rounded-full
        backdrop-blur-md border border-white/20
        transition-all duration-300
        ${darkMode 
          ? 'bg-dark-100/80 text-yellow-400 hover:bg-dark-200/80' 
          : 'bg-white/80 text-gray-700 hover:bg-white/90'
        }
        shadow-lg hover:shadow-xl hover:scale-105
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: darkMode ? 180 : 0,
          scale: darkMode ? 1 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {darkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </motion.div>
    </motion.button>
  );
};