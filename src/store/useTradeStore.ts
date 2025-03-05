import { create } from "zustand";
import axios from "axios";

interface TradeState {
  placeOrder: (type: string, option: string, price: number, quantity: number) => Promise<void>;
}

const useTradeStore = create<TradeState>(() => ({
  placeOrder: async (type, option, price, quantity) => {
    try {
      console.log("Placing order:", { type, option, price, quantity });
      await axios.post("/api/trade", { type, option, price, quantity });
    } catch (error) {
      console.error("Error placing order", error);
    }
  },
}));

export default useTradeStore;
