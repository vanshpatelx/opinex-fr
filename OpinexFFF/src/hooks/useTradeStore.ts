
import { create } from 'zustand';

type TradeType = 'yes' | 'no';
type OrderType = 'buy' | 'sell';

interface TradeState {
  isTradePopupOpen: boolean;
  selectedType: TradeType;
  orderType: OrderType;
  price: number;
  quantity: number;
  actions: {
    openTradePopup: () => void;
    closeTradePopup: () => void;
    setSelectedType: (type: TradeType) => void;
    setOrderType: (type: OrderType) => void;
    setPrice: (price: number) => void;
    setQuantity: (quantity: number) => void;
    placeOrder: () => void;
  };
}

export const useTradeStore = create<TradeState>((set, get) => ({
  isTradePopupOpen: false,
  selectedType: 'yes',
  orderType: 'buy',
  price: 0.50,
  quantity: 1,
  actions: {
    openTradePopup: () => set({ isTradePopupOpen: true }),
    closeTradePopup: () => set({ isTradePopupOpen: false }),
    setSelectedType: (type) => set({ selectedType: type }),
    setOrderType: (type) => set({ orderType: type }),
    setPrice: (price) => set({ price: price }),
    setQuantity: (quantity) => set({ quantity: quantity }),
    placeOrder: () => {
      console.log('Order placed:', {
        type: get().selectedType,
        orderType: get().orderType,
        price: get().price,
        quantity: get().quantity,
      });
      set({ isTradePopupOpen: false });
      // In a real app, we would send this to an API
    },
  },
}));
