import React from 'react'
import './style/Navbar.css'
import { OptionsInput } from './OptionsInput'
import { languages, temperature } from './settings'

export default function Navbar() {
  return (
      <>
        <nav>
          <h1>Weather In the United States</h1>
          
          <div id="settings">
              <OptionsInput id="lang" label="Lang" items={languages}/>
              <OptionsInput id="temp" label="Temp" items={temperature}/>
          </div>
        </nav>
      </> 
  )
}
