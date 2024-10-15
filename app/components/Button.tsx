'use client';
import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  link?: string;
  className?: string;
  newTab?: boolean;
}

const Button:React.FC<ButtonProps> = ({
  children,
  onClick,
  link,
  className,
  newTab
}) => {
  return (
    <>
      {link ? 
        <Link 
          href={link}
          className={className}
          target={newTab ? "_blank" : "_self"}
        >
          {children ?
            <>
              {children}
            </>
          :
            <>
              {children}
            </>
          }
        </Link>
      :
        <button
          className={className}
          onClick={onClick}
        >
          {children ?
            <>
              {children}
            </>
          :
            <>
              {children}
            </>
          }
        </button>
      }
    </>
  )
}

export default Button