import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import RoutesProvider from './providers/RoutesProvider'

import PrimeLendRow from './pages/PrimeLendRow'

createRoot(document.getElementById('primelendrow-content')).render(

    <StrictMode>

        <RoutesProvider />
        
    </StrictMode>

)

createRoot(document.getElementById('primelendrow')).render(

    <StrictMode>

        <PrimeLendRow />
      
    </StrictMode>

)