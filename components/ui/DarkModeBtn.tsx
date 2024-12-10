'use client';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from 'framer-motion';

const DarkmodeBtn = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
      }
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  return (
    <div className='flex items-center justify-between gap-2 w-fit'>
      {isDarkMode ?
        <motion.div 
          className=''
          key="sun"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaSun className='text-yellow-400' size={20} />
        </motion.div>
      :
        <motion.div 
          className=''
          key="moon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaMoon className='text-blue-900' size={20}/>
        </motion.div>
      }
      <Button
        variant={'ghost'}
        onClick={toggleDarkMode}
        className='py-1 px-2.5 h-fit hover:bg-slate-200 rounded-full bg-gray-300 dark:hover:bg-green-400 dark:bg-green-500 duration-300 relative'
      >
        <div className='bg-white w-5 h-5 dark:left-1.5 rounded-full relative -left-1.5 top-0 duration-150'/>
      </Button>
    </div>

  );
};

export default DarkmodeBtn;
