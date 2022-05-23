import React from 'react'
import RecipesSearch from './RecipesSearch';
import SwapThemes from './SwapThemes';

export default function Navbar() {
  return (
    <div className="z-40 navbar fixed top-0 left-0 bg-base-200">
        <SwapThemes />
        <div className="flex-1 mx-4">
            <a href='/' className="normal-case text-xl">Pcs Recipes</a>
        </div>
        <div className="flex-none gap-2">
          <RecipesSearch />
        </div>
    </div>
  )
}
