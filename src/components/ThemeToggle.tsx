
import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="sm"
      onClick={toggleTheme}
      className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 h-8 w-8 p-0 relative overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut"
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={12} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'light' ? 0 : -180,
          scale: theme === 'light' ? 1 : 0
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut"
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={12} />
      </motion.div>
    </Button>
  );
};

export default ThemeToggle;
