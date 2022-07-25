import React, { useContext } from 'react'
import { myContext } from './Context'

export default function HomePage() {
  // This hook grabs the value prop off of the provider(myContext)
  const ctx = useContext(myContext)
  console.log(ctx)

  return (
    <div>
      Home
    </div>
  )
}
