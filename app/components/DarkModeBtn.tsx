'use client';
import { useEffect, useState } from 'react';
import Button from './Button';
import { FaSun, FaMoon } from "react-icons/fa";
import { div } from 'framer-motion/m';
import { motion } from 'framer-motion';

const DarkmodeBtn = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' ? true : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className='flex items-center justify-between gap-2'>
      {isDarkMode ?
        <motion.div 
          className=''
          key="sun"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaSun className='text-yellow-400' size={24} />
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
        onClick={toggleDarkMode}
        className='px-2.5 py-1 rounded-full w bg-gray-300 dark:bg-green-500 duration-300 relative'
      >
        <div className='bg-white w-6 h-6 dark:left-1.5 rounded-full relative -left-1.5 top-0 duration-150'/>
      </Button>
    </div>

  );
};

export default DarkmodeBtn;
