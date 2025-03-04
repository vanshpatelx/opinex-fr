// "use client"

// import { useEffect, useState } from "react";
// import { TrendingUp, TrendingDown } from "lucide-react";
// import { Bar, BarChart, XAxis, YAxis } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";

// const generateOrders = () => {
//   return {
//     buyOrders: Array.from({ length: 4 }, (_, i) => ({
//       price: (1 + Math.random() * 9).toFixed(2),
//       quantity: Math.floor(Math.random() * 10) + 1,
//     })).sort((a, b) => b.price - a.price),
//     sellOrders: Array.from({ length: 4 }, (_, i) => ({
//       price: (1 + Math.random() * 9).toFixed(2),
//       quantity: Math.floor(Math.random() * 10) + 1,
//     })).sort((a, b) => a.price - b.price),
//   };
// };

// export function OrderBook() {
//   const [orders, setOrders] = useState(generateOrders());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOrders(generateOrders());
//     }, 200);
//     return () => clearInterval(interval);
//   }, []);

//   const { buyOrders, sellOrders } = orders;
//   const chartData = [
//     ...sellOrders.map((o) => ({ price: o.price, quantity: o.quantity, type: "Sell" })),
//     ...buyOrders.map((o) => ({ price: o.price, quantity: o.quantity, type: "Buy" })),
//   ];

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Order Book</CardTitle>
//         <CardDescription>Live Buy/Sell Orders</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between mb-4 p-2 text-lg font-bold">
//           <div className="text-green-500">Buy Price: {buyOrders[0]?.price}</div>
//           <div className="text-red-500">Sell Price: {sellOrders[0]?.price}</div>
//         </div>

//         <BarChart
//           width={400}
//           height={250}
//           data={chartData}
//           layout="vertical"
//           margin={{ left: -20 }}
//         >
//           <XAxis type="number" hide />
//           <YAxis
//             dataKey="price"
//             type="category"
//             tickLine={false}
//             tickMargin={10}
//             axisLine={false}
//           />
//           <Bar dataKey="quantity" fill="var(--color-buy)" radius={5} />
//         </BarChart>

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <div>
//             <h3 className="text-green-500 font-bold">Buy Orders</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr>
//                   <th className="text-left">Price</th>
//                   <th className="text-right">Qty</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {buyOrders.map((order, index) => (
//                   <tr key={index}>
//                     <td className="text-green-500">{order.price}</td>
//                     <td className="text-right">{order.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div>
//             <h3 className="text-red-500 font-bold">Sell Orders</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr>
//                   <th className="text-left">Price</th>
//                   <th className="text-right">Qty</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sellOrders.map((order, index) => (
//                   <tr key={index}>
//                     <td className="text-red-500">{order.price}</td>
//                     <td className="text-right">{order.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { TrendingUp, TrendingDown } from "lucide-react";
// import { Bar, BarChart, XAxis, YAxis } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";

// export function OrderBook() {
//   const [orders, setOrders] = useState({ buyOrders: [], sellOrders: [] });
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     let socket;

//     const connectWebSocket = () => {
//       socket = new WebSocket("ws://localhost:8080");
//       setWs(socket);

//       socket.onopen = () => {
//         console.log("WebSocket connected");
//       };

//       socket.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         if (data.type === "orderbook") {
//           const buyOrders = data.orderBook.filter(o => Math.random() > 0.5).sort((a, b) => b.price - a.price);
//           const sellOrders = data.orderBook.filter(o => Math.random() <= 0.5).sort((a, b) => a.price - b.price);
//           setOrders({ buyOrders, sellOrders });
//         }
//       };

//       socket.onclose = () => {
//         console.log("WebSocket disconnected, attempting to reconnect...");
//         setTimeout(connectWebSocket, 1000);
//       };

//       socket.onerror = (error) => {
//         console.error("WebSocket error:", error);
//         socket.close();
//       };
//     };

//     connectWebSocket();
//     return () => socket?.close();
//   }, []);

//   const { buyOrders, sellOrders } = orders;
//   const chartData = [
//     ...sellOrders.map((o) => ({ price: o.price, quantity: o.quantity, type: "Sell" })),
//     ...buyOrders.map((o) => ({ price: o.price, quantity: o.quantity, type: "Buy" })),
//   ];

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Order Book</CardTitle>
//         <CardDescription>Live Buy/Sell Orders</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between mb-4 p-2 text-lg font-bold">
//           <div className="text-green-500">Buy Price: {buyOrders[0]?.price || "-"}</div>
//           <div className="text-red-500">Sell Price: {sellOrders[0]?.price || "-"}</div>
//         </div>

//         <BarChart
//           width={400}
//           height={250}
//           data={chartData}
//           layout="vertical"
//           margin={{ left: -20 }}
//         >
//           <XAxis type="number" hide />
//           <YAxis
//             dataKey="price"
//             type="category"
//             tickLine={false}
//             tickMargin={10}
//             axisLine={false}
//           />
//           <Bar dataKey="quantity" fill="var(--color-buy)" radius={5} />
//         </BarChart>

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <div>
//             <h3 className="text-green-500 font-bold">Buy Orders</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr>
//                   <th className="text-left">Price</th>
//                   <th className="text-right">Qty</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {buyOrders.map((order, index) => (
//                   <tr key={index}>
//                     <td className="text-green-500">{order.price}</td>
//                     <td className="text-right">{order.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div>
//             <h3 className="text-red-500 font-bold">Sell Orders</h3>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr>
//                   <th className="text-left">Price</th>
//                   <th className="text-right">Qty</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sellOrders.map((order, index) => (
//                   <tr key={index}>
//                     <td className="text-red-500">{order.price}</td>
//                     <td className="text-right">{order.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function OrderBook() {
  const [orders, setOrders] = useState({ buyOrders: [], sellOrders: [] });
  const [ws, setWs] = useState(null);

  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      socket = new WebSocket("ws://localhost:8080");
      setWs(socket);

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "orderbook") {
          const buyOrders = data.orderBook
            .filter(o => Math.random() > 0.5)
            .map(o => ({ ...o, quantity: Number(o.quantity) }))
            .sort((a, b) => b.price - a.price)
            .slice(0, 5);

          // Add dummy order if less than 5
          while (buyOrders.length < 5) {
            const lastPrice = buyOrders.length > 0 ? buyOrders[buyOrders.length - 1].price : 100; // Default price
            buyOrders.push({ price: lastPrice - 0.5, quantity: 1, dummy: true });
          }

          const sellOrders = data.orderBook
            .filter(o => Math.random() <= 0.5)
            .map(o => ({ ...o, quantity: Number(o.quantity) }))
            .sort((a, b) => a.price - b.price)
            .slice(0, 5);

          // Add dummy order if less than 5
          while (sellOrders.length < 5) {
            const lastPrice = sellOrders.length > 0 ? sellOrders[sellOrders.length - 1].price : 101; // Default price
            sellOrders.push({ price: lastPrice - 0.5, quantity: 1, dummy: true });
          }

          console.log({ buyOrders, sellOrders });

          setOrders({ buyOrders, sellOrders });
        }
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected, attempting to reconnect...");
        setTimeout(connectWebSocket, 1000);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        socket.close();
      };
    };

    connectWebSocket();
    return () => socket?.close();
  }, []);

  const { buyOrders, sellOrders } = orders;
  const BuyChartData = buyOrders;
  const SellChartData = sellOrders;

  return (
    <Card className="m-0 p-0">
      {/* <CardHeader>
        <CardTitle>Order Book</CardTitle>
        <CardDescription>Live Buy/Sell Orders</CardDescription>
      </CardHeader> */}
      <CardContent>
        <div className="flex justify-center mb-2 p-2 text-lg font-bold">
          <div className="text-gray-700">Price: {buyOrders[0]?.price || "-"}</div>
        </div>

        <div className="flex flex-row">
          <BarChart width={400} height={250} data={BuyChartData} layout="vertical" margin={{ left: 0 }}>
            <XAxis type="number" domain={[0, 'auto']} hide />
            <YAxis dataKey="price" type="category"  tickLine={false} axisLine={false} />
            <Bar dataKey="quantity" fill="#22c55e" radius={5} name="Buy Orders" />
            <Legend />
          </BarChart>

          <BarChart width={400} height={250} data={SellChartData} layout="vertical" margin={{ left: 0 }}>
            <XAxis type="number" domain={[0, 'auto']} hide />
            <YAxis dataKey="price" type="category" tickLine={false} tickMargin={10} axisLine={false} />
            <Bar dataKey="quantity" fill="#ef4444" radius={5} name="Sell Orders" />
            <Legend />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
}
