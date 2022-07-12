import React from 'react'
import SwapThemes from './SwapThemes';
const subtitle = 'users';

export default function Navbar() {
  return (
    <div className='relative'> 
      <SwapThemes />
      <div className="p-4 sm:px-2 flex flex-col items-center flex-1 gap-6">
          <h1 className="text-5xl">Shmuel Toporowitch Blog</h1>
          <div className="w-4/5 m-2 bg-accent h-1 round-lg"></div>
      </div>
    </div>
  )
}
