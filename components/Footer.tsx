'use client';
import React from 'react'
import { motion } from 'framer-motion';

type FooterProps = {
  duration: number;
}

const Footer:React.FC<FooterProps> = ({ duration }) => {
  return (
    <motion.footer 
      className='fixed bottom-0 w-full text-center text-xs bg-slate-100 dark:bg-slate-800 dark:text-white duration-300 py-2'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration }}
    >
      Copyright © 2024 <span className='text-[#20d464] font-extrabold'>Statify</span>. All rights reserved.
    </motion.footer>
  )
}

export default Footer