import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Tratamientos from "./pages/Tratamientos";
import TratamientoDetalle from "./pages/TratamientoDetalle";
import Tienda from "./pages/Tienda";
import ProductoDetalle from "./pages/ProductoDetalle";
import PrimeraConsulta from "./pages/PrimeraConsulta";
import Turnos from "./pages/Turnos";
import SobreMi from "./pages/SobreMi";
import Contacto from "./pages/Contacto";
import AdminLogin from "./pages/AdminLogin";
import AdminTratamientos from "./pages/AdminTratamientos";
import AdminTratamientoForm from "./pages/AdminTratamientoForm";
import AdminProductos from "./pages/AdminProductos";
import AdminProductoForm from "./pages/AdminProductoForm";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import ProtectedRoute from "./components/AdminLayout/ProtectedRoute";

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
      { path: "primera-consulta", element: <PrimeraConsulta /> },
      { path: "turnos", element: <Turnos /> },
      { path: "sobre-mi", element: <SobreMi /> },
      { path: "contacto", element: <Contacto /> },
    ],
  },
  {
    path: "/admin",
    children: [
      { path: "login", element: <AdminLogin /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminTratamientos /> },
              { path: "tratamientos/nuevo", element: <AdminTratamientoForm /> },
              { path: "tratamientos/:id/editar", element: <AdminTratamientoForm /> },
              { path: "productos", element: <AdminProductos /> },
              { path: "productos/nuevo", element: <AdminProductoForm /> },
              { path: "productos/:id/editar", element: <AdminProductoForm /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
