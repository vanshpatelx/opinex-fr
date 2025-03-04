import { create } from "zustand";
import axios from "axios";

const useTradeStore = create((set) => ({
  orders: [],
  placeOrder: async (type: string, option: string, price: number, quantity: number) => {
    try {
      console.log("hello", type, option, price, quantity);
      const response = await axios.post("/api/trade", {
        type,
        option,
        price,
        quantity,
      });
      set((state) => {
        const newOrders = [...state.orders, response.data];
        console.log("New orders:", newOrders);  // ✅ Debugging state update
        return { orders: newOrders };
      });
    } catch (error) {
      console.error("Error placing order", error);
    }
  },
}));

export default useTradeStore;
