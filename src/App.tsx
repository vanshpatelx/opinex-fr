// import { useState } from 'react'
// import { Button } from "@/components/ui/button"

// import WebsitePreviewAndLive from "./components/preview/live"

import './App.css'
import { Trade } from './components/event/trade'
// import { Component } from './components/auth/form'
// import { AuthTabs } from './components/auth/full'
// import { OrderBook } from './components/event/orderbook'
// import { TabsDemo } from "./components/event/trade"
// import PriceInput from "./components/event/priceInput"

function App() {

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      {/* <Button>Click me</Button>
      <TabsDemo />
      <PriceInput/> */}
      {/* <Component/> */}
      {/* <AuthTabs/> */}
      {/* <OrderBook/> */}
      <Trade />
    </div>

  )
}

export default App



// "use client";

// import { useAuthStore } from "@/store/useAuthStore";
// import "./App.css";
// import { AuthTabs } from "./components/auth/full";
// import { Button } from "@/components/ui/button";


// function App(){
//   const {user, isAuthenticated, logout} = useAuthStore();

//   return(
//     <div className="flex flex-col items-center justify-center min-h-screen p-6">
//       {!isAuthenticated ? (
//         <AuthTabs />
//       ) : (
//         <div className="p-6 bg-white shadow-lg rounded-lg text-center space-y-4">
//           <h2 className="text-xl font-semibold">Welcome, {user?.name}!</h2>
//           <p className="text-gray-600">Email: {user?.email}</p>
//           <Button onClick={logout} className="w-full">
//             Logout
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default App;


// function App() {
//   return (
//     <div>
{/* <WebsitePreviewAndLive/> */}
//     </div>
//   )
// }

// export default App
