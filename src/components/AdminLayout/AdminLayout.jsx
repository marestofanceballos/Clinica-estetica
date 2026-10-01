import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./adminLayout.css";

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="admin-layout">
      <header className="admin-layout__header">
        <div className="container-narrow admin-layout__header-inner">
          <Link to="/admin" className="admin-layout__brand">
            Sol Ceballos <span>· Admin</span>
          </Link>

          <nav className="admin-layout__nav">
            <NavLink to="/admin" end className={({ isActive }) => (isActive ? "is-active" : "")}>
              Tratamientos
            </NavLink>
            <NavLink to="/admin/productos" className={({ isActive }) => (isActive ? "is-active" : "")}>
              Productos
            </NavLink>
          </nav>

          <div className="admin-layout__user">
            <span>{admin?.username}</span>
            <button type="button" className="btn-brand btn-brand-outline btn-brand-sm" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="container-narrow admin-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
