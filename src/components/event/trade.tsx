// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import PriceInput from "./priceInput"

// export function trade() {
//   return (
//     <Tabs defaultValue="yes" className="w-[400px]">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="yes">Yes</TabsTrigger>
//         <TabsTrigger value="no">No</TabsTrigger>
//       </TabsList>
//       <TabsContent value="yes">
//         <Card>
//           <CardHeader>
//             <CardTitle>Yes Order</CardTitle>
//             <CardDescription>
//               Let's bet with Yes...
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="flex flex-row items-center justify-between w-full">
//               <label className="font-bold">Price:</label>
//               <PriceInput maxLimit={10} step={0.5} minLimit={0.5} decimalPlaces={1} />
//             </div>
//             <div className="flex flex-row items-center justify-between w-full">
//               <label className="font-bold">Quantity:</label>
//               <PriceInput maxLimit={100} step={1} minLimit={1} />
//             </div>
//           </CardContent>
//           <CardFooter>
//             <div className="flex flex-row items-center justify-between w-full gap-2">
//               <Button className="w-1/2" variant="bullish">Buy </Button>
//               <Button className="w-1/2" variant="bearish">Sell</Button>
//             </div>
//           </CardFooter>
//         </Card>
//       </TabsContent>
//       <TabsContent value="no">
//         <Card>
//           <CardHeader>
//             <CardTitle>No Order</CardTitle>
//             <CardDescription>
//               Let's bet with No...
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="flex flex-row items-center justify-between w-full">
//               <label className="font-bold">Price:</label>
//               <PriceInput maxLimit={10} step={0.5} minLimit={0.5} decimalPlaces={1} />
//             </div>
//             <div className="flex flex-row items-center justify-between w-full">
//               <label className="font-bold">Quantity:</label>
//               <PriceInput maxLimit={100} step={1} minLimit={1} />
//             </div>
//           </CardContent>
//           <CardFooter>
//             <div className="flex flex-row items-center justify-between w-full gap-2">
//               <Button className="w-1/2" variant="bullish">Buy </Button>
//               <Button className="w-1/2" variant="bearish">Sell</Button>
//             </div>
//           </CardFooter>
//         </Card>
//       </TabsContent>
//     </Tabs>
//   )
// }


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import PriceInput from "./PriceInput";
// import useTradeStore from "./store/tradeStore";

// export function Trade() {
//   const { placeOrder } = useTradeStore();
//   const [price, setPrice] = useState(5);
//   const [quantity, setQuantity] = useState(10);

//   const handleTrade = (type: "buy" | "sell", option: "yes" | "no") => {
//     placeOrder(type, option, price, quantity);
//   };

//   return (
//     <Tabs defaultValue="yes" className="w-[400px]">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="yes">Yes</TabsTrigger>
//         <TabsTrigger value="no">No</TabsTrigger>
//       </TabsList>
//       {["yes", "no"].map((option) => (
//         <TabsContent key={option} value={option}>
//           <Card>
//             <CardHeader>
//               <CardTitle>{option.charAt(0).toUpperCase() + option.slice(1)} Order</CardTitle>
//               <CardDescription>Let's bet with {option}...</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="flex flex-row items-center justify-between w-full">
//                 <label className="font-bold">Price:</label>
//                 <PriceInput
//                   maxLimit={10}
//                   step={0.5}
//                   minLimit={0.5}
//                   decimalPlaces={1}
//                   onChange={setPrice}
//                 />
//               </div>
//               <div className="flex flex-row items-center justify-between w-full">
//                 <label className="font-bold">Quantity:</label>
//                 <PriceInput
//                   maxLimit={100}
//                   step={1}
//                   minLimit={1}
//                   onChange={setQuantity}
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <div className="flex flex-row items-center justify-between w-full gap-2">
//                 <Button
//                   className="w-1/2"
//                   variant="bullish"
//                   onClick={() => handleTrade("buy", option as "yes" | "no")}
//                 >
//                   Buy
//                 </Button>
//                 <Button
//                   className="w-1/2"
//                   variant="bearish"
//                   onClick={() => handleTrade("sell", option as "yes" | "no")}
//                 >
//                   Sell
//                 </Button>
//               </div>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       ))}
//     </Tabs>
//   );
// }


import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import PriceInput from "./priceInput";
import useTradeStore from "../../store/useTradeStore";
import TradeAlert from "../alert/alert";



export function Trade() {
  const { placeOrder } = useTradeStore();
  const [price, setPrice] = useState(5);
  const [quantity, setQuantity] = useState(10);
  const [showAlert, setShowAlert] = useState(false);

  const handleTrade = async (type: "buy" | "sell", option: "yes" | "no") => {
    try {
      await placeOrder(type, option, price, quantity);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Order placement failed", error);
    }
  };

  return (
    <div className="bg-gray-900">
      <TradeAlert show={showAlert} msg={"Order placed successfully!"} onClose={() => setShowAlert(false)} />
      <Tabs defaultValue="yes" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="yes">Yes</TabsTrigger>
          <TabsTrigger value="no">No</TabsTrigger>
        </TabsList>
        {['yes', 'no'].map((option) => (
          <TabsContent key={option} value={option}>
            <Card>
              <CardHeader>
                <CardTitle>{option.charAt(0).toUpperCase() + option.slice(1)} Order</CardTitle>
                <CardDescription>Let's bet with {option}...</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-row items-center justify-between w-full">
                  <label className="font-bold">Price:</label>
                  <PriceInput maxLimit={10} step={0.5} minLimit={0.5} decimalPlaces={1} value={price} onChange={setPrice} />
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <label className="font-bold">Quantity:</label>
                  <PriceInput maxLimit={100} step={1} minLimit={1} value={quantity} onChange={setQuantity} />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-row items-center justify-between w-full gap-2">
                  <Button className="w-1/2" variant="bullish" onClick={() => handleTrade("buy", option as "yes" | "no")}>
                    Buy
                  </Button>
                  <Button className="w-1/2" variant="bearish" onClick={() => handleTrade("sell", option as "yes" | "no")}>
                    Sell
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default Trade;
