import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Tratamientos from "./pages/Tratamientos";
import TratamientoDetalle from "./pages/TratamientoDetalle";
import Tienda from "./pages/Tienda";
import ProductoDetalle from "./pages/ProductoDetalle";
import Turnos from "./pages/Turnos";
import SobreMi from "./pages/SobreMi";
import Contacto from "./pages/Contacto";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "tratamientos", element: <Tratamientos /> },
      { path: "tratamientos/:id", element: <TratamientoDetalle /> },
      { path: "tienda", element: <Tienda /> },
      { path: "tienda/:id", element: <ProductoDetalle /> },
      { path: "turnos", element: <Turnos /> },
      { path: "sobre-mi", element: <SobreMi /> },
      { path: "contacto", element: <Contacto /> },
    ],
  },
]);

export default router;
