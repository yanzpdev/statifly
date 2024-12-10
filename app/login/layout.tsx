import { Metadata } from 'next';
import React from 'react'
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to Statify.",
};

export default function LoginLayout({children}: {children:React.ReactNode}) {
  return(
    <>
      <main>
        {children}
      </main>
      <Footer duration={0.5} />
    </>
  )
}