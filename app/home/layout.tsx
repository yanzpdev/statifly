import React from 'react'
import Header from '@/components/Header'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';

export default async function DashboardLayout({children}: {children:React.ReactNode}) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return(
    <>
      <Header />
      <main>
        {children}
      </main>
    </> 
  )
}