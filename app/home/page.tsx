'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState} from 'react'
import ShowCaseComponent from '@/components/ShowCaseComponent';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');

  return(
    <motion.section 
      className='w-full h-full bg-slate-100 dark:bg-slate-800 p-10 duration-200'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full flex gap-2 items-center justify-end mb-5">
        <Select
          value={timeRange}
          onValueChange={(value) => {
            if (value === 'short_term' || value === 'medium_term' || value === 'long_term') {
              setTimeRange(value);
            }
          }}
        >
          <SelectTrigger className="w-[180px] select-none bg-white dark:bg-slate-900 dark:border-white border">
            <SelectValue placeholder="TimeRange" />
          </SelectTrigger>
          <SelectContent defaultValue={timeRange}>
            <SelectItem value="short_term">Last 4 weeks</SelectItem>
            <SelectItem value="medium_term">Last 6 months</SelectItem>
            <SelectItem value="long_term">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ShowCaseComponent apiRoute='top-artists' timeRange={timeRange} />
      <ShowCaseComponent apiRoute='top-tracks' timeRange={timeRange} />
    </motion.section>
  )
}