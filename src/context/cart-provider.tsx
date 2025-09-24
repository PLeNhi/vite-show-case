import React from 'react';
import type { Product } from '../apis/api';

export type TCartItem = Product & { quantity: number };
export type TCartState = TCartItem[];

export type Action =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'INCREASE_QUANTITY'; payload: number }
  | { type: 'DECREASE_QUANTITY'; payload: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: TCartState, action: Action): TCartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'INCREASE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'DECREASE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export type CartContextType = {
  cart: TCartState;
  dispatch: React.Dispatch<Action>;
};

const CartStateContext = React.createContext<TCartState | undefined>(undefined);
const CartDispatchContext = React.createContext<React.Dispatch<Action> | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = React.useReducer(cartReducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={cart}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export function useCart() {
  const ctx = React.useContext(CartStateContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
export function useCartDispatch() {
  const ctx = React.useContext(CartDispatchContext);
  if (!ctx) throw new Error('useCartDispatch must be used within CartProvider');
  return ctx;
}

// export const useCartDispatch = () => {
//   const context = React.useContext(CartDispatchContext);
//   if (!context) {
//     throw new Error('useCartDispatch must be used within a CartProvider');
//   }
//   return context;
// };

// export const useCart = () => {
//   const context = React.useContext(CartStateContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
export const selectCartCount = (cart: TCartState) => cart.reduce((s, i) => s + i.quantity, 0);
export const selectCartTotal = (cart: TCartState) =>
  cart.reduce((s, i) => s + i.quantity * i.price, 0);
