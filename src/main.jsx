import React from 'react'
import ReactDOM from 'react-dom/client'
import { BowserRouter } from 'react-router-dom'

import { HeroesApp } from './HeroesApp'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BowserRouter>
      <HeroesApp />
    </BowserRouter>
  </React.StrictMode>
)
