import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const initialState = {
  items: [], // { id, nombre, precio, imagen, cantidad }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const producto = action.payload;
      const existente = state.items.find((item) => item.id === producto.id);

      if (existente) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...producto, cantidad: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case "INCREMENT": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, cantidad: item.cantidad + 1 } : item
        ),
      };
    }

    case "DECREMENT": {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id ? { ...item, cantidad: item.cantidad - 1 } : item
          )
          .filter((item) => item.cantidad > 0),
      };
    }

    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

// El carrito se guarda en el navegador para que sobreviva a la ida y
// vuelta a Mercado Pago (que recarga la página).
const STORAGE_KEY = "carrito";

function loadInitialState() {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(items) ? { items } : initialState;
  } catch {
    return initialState;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Sin almacenamiento disponible (ej. modo privado): el carrito sigue en memoria.
    }
  }, [state.items]);

  const value = useMemo(() => {
    const cantidadTotal = state.items.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrecio = state.items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

    return {
      items: state.items,
      cantidadTotal,
      totalPrecio,
      addItem: (producto) => dispatch({ type: "ADD_ITEM", payload: producto }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      incrementItem: (id) => dispatch({ type: "INCREMENT", payload: { id } }),
      decrementItem: (id) => dispatch({ type: "DECREMENT", payload: { id } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
