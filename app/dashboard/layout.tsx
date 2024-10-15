'use client';
import React from 'react'
import Header from '../components/Header'
import { motion } from 'framer-motion';

export default function DashboardLayout({children}: {children:React.ReactNode}) {
  return(
    <>
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.main>
    </>
  )
}