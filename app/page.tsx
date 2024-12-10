'use client';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated"){
      router.push('/home'); 
    } 
    
    else if (status === "unauthenticated"){
      router.push('/login'); 
    }
  }, [status, router]);

  if (status === "loading"){
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-slate-900">
        <Image 
          src={'/assets/ball-loading.gif'} 
          alt={'Loading...'}          
          width={500}
          height={500} 
          className="h-[100px] w-[100px] lg:w-[400px] lg:h-[400px]"
          unoptimized
        />
      </div>
    );
  }
}
