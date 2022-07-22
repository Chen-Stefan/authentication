import React, { useContext } from 'react'
import { myContext } from './Context'

export default function HomePage() {
  // This hook grabs the vcalue prop off of the provider(myContext)
  const ctx = useContext(myContext)
  return (
    <div>
      
    </div>
  )
}
