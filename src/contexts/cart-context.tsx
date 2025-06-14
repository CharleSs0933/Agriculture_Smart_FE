"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock user ID for demo purposes
const MOCK_USER_ID = 1;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
          setCart(JSON.parse(savedCart));
        } else {
          // Initialize empty cart
          const newCart: Cart = {
            id: Date.now(), // In real app, this would come from API
            userId: MOCK_USER_ID,
            totalAmount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            cartItems: [],
          };
          setCart(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addItem = (product: Product, quantity = 1) => {
    if (!cart) return;

    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      const existingItemIndex = prevCart.cartItems.findIndex(
        (item) => item.productId === product.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item
        const existingItem = prevCart.cartItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        const newTotalPrice = product.price * newQuantity;

        updatedItems = [...prevCart.cartItems];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: newTotalPrice,
          updatedAt: new Date().toISOString(),
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now(), // In real app, this would come from API
          cartId: prevCart.id,
          productId: product.id,
          quantity: quantity,
          unitPrice: product.price,
          totalPrice: product.price * quantity,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          product: product,
        };

        updatedItems = [...prevCart.cartItems, newItem];
      }

      // Calculate new total
      const newTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        ...prevCart,
        cartItems: updatedItems,
        totalAmount: newTotalAmount,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const removeItem = (itemId: number) => {
    if (!cart) return;

    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      const updatedItems = prevCart.cartItems.filter(
        (item) => item.id !== itemId
      );

      // Calculate new total
      const newTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        ...prevCart,
        cartItems: updatedItems,
        totalAmount: newTotalAmount,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (!cart || quantity < 1) return;

    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      const updatedItems = prevCart.cartItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: quantity,
            totalPrice: item.unitPrice * quantity,
            updatedAt: new Date().toISOString(),
          };
        }
        return item;
      });

      // Calculate new total
      const newTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        ...prevCart,
        cartItems: updatedItems,
        totalAmount: newTotalAmount,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const clearCart = () => {
    if (!cart) return;

    setCart({
      ...cart,
      cartItems: [],
      totalAmount: 0,
      updatedAt: new Date().toISOString(),
    });
  };

  // Calculate total number of items
  const itemCount =
    cart && cart.cartItems
      ? cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
      : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
