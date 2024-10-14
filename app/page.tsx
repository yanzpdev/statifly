import React from "react";
import Header from "./components/Header";
import { redirect } from "next/navigation";

export default function Home() {
  const session = false;
  
  if (!session) {
    redirect('/login');
  } 

  else {
    redirect('/dashboard');
  }
}
