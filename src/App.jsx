import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Guitar from "./Guitar.jsx";
import { db } from "./data/db.js";


export default function App() {
  const initialState = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialState);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  const addToCart = (item) => {
    // const newCart = [...cart, cart.indexOf(cart.find((item) => item.id === cart.id))];
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
      return;
    }
    item.quantity = 1;
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((guitar) => guitar.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  };


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  return (
    <>
      <Header cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              clearCart={clearCart}
              decreaseQuantity={decreaseQuantity}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) => (
              <Guitar
                guitar={guitar} key={guitar.id}
                setCart={setCart}
                cart={cart}
                addToCart={addToCart}
              />
            ))
          }
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

