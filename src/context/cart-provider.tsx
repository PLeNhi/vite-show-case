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

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = React.useReducer(cartReducer, []);

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

export const useCartDispatch = (): React.Dispatch<Action> => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context.dispatch;
};

export const useCart = (): CartContextType => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const selectCartCount = (cart: TCartState): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const selectCartTotal = (cart: TCartState): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
