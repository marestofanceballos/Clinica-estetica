import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CartSidebar from "./components/Cart/CartSidebar";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import { useScrollToTop } from "./hooks/useScrollToTop";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  useScrollToTop();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main id="main-content">
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
