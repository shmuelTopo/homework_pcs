import React from 'react'
import RecipesSearch from './RecipesSearch';
import logo from './pizza.png'
import SwapThemes from './SwapThemes';

export default function Navbar() {
  return (
    <div className="navbar fixed z-100 top-0 left-0 bg-base-200">
        <SwapThemes />
        <div className="flex-1 mx-4">
            <a href='/' className="normal-case text-xl">Pcs Recipes</a>
        </div>
        <div className="flex-none gap-2">
          <RecipesSearch />
          <img className='mask mask-circle w-12' alt='imaged' src={logo} />
        </div>
    </div>
  )
}
