import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to Statifly.",
};

export default function LoginLayout({children}: {children:React.ReactNode}) {
  return(
    <>
      <main>
        {children}
      </main>
      <footer className='fixed bottom-0 w-full text-center text-xs bg-slate-100 py-2'>
        Copyright © 2024 Statifly. All rights reserved.
      </footer>
    </>
  )
}