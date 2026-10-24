import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";

const categorias = ["Acción", "Aventura", "Estrategia"];

export default function Navbar() {
  return (
    <>
      {/* Navbar superior: logo, buscador y botones de sesión */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img src="/assets/img/face-dino3.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
          </Link>
          <div className="collapse navbar-collapse justify-content-center">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          </div>
          <div className="d-flex">
            <Link href="/iniciar-sesion" className="btn btn-outline-primary ms-2">Iniciar Sesión</Link>
            <Link href="/crear-sesion" className="btn btn-primary ms-2">Crear Cuenta</Link>
            <button
              className="btn btn-primary d-lg-none ms-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMobileMenu"
              aria-controls="offcanvasMobileMenu"
              aria-label="Abrir menú"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Navbar inferior: solo se ve en pantallas grandes */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary d-none d-lg-block">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink href="/"><strong>Home</strong></NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorías
                </a>
                <ul className="dropdown-menu">
                  {categorias.map((categoria) => (
                    <li key={categoria}>
                      <Link className="dropdown-item" href="/categorias">{categoria}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item"><NavLink href="/ofertas">Ofertas</NavLink></li>
              <li className="nav-item"><NavLink href="/nosotros">Nosotros</NavLink></li>
              <li className="nav-item"><NavLink href="/blog">Blog</NavLink></li>
              <li className="nav-item"><NavLink href="/contacto">Contacto</NavLink></li>
              <li className="nav-item">
                {/* El total se hará dinámico en la tarea del carrito */}
                <Link className="btn btn-success ms-5" href="/carrito">
                  <strong><i className="bi bi-cart4"></i> Carrito $0</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <MobileMenu />
    </>
  );
}