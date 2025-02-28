// import { useState } from 'react'
import { Button } from "@/components/ui/button"

import './App.css'
import { TabsDemo } from "./components/event/trade"
import PriceInput from "./components/event/priceInput"

function App() {

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      {/* <Button>Click me</Button> */}
      <TabsDemo />
      <PriceInput/>
    </div>

  )
}

export default App
