import React from 'react'
import Button from './Button';
import Image from 'next/image';

type HeaderProps = {
  className?: string;
}

const Header:React.FC<HeaderProps> = ({
  className
}) => {
  return (
    <header className="sticky top-0 p-2 border-b flex justify-between items-center">
      <Button
        className=''
        link='/'
      >
        <Image 
          src='/assets/logo.svg'
          alt="Statifly Logo"
          width={200}
          height={200}
          className='h-auto w-36 lg:w-52'
        />
      </Button>
      <nav>
  
      </nav>
    </header>
  )
}

export default Header