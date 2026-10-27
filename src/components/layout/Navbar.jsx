import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";
import BotonCarrito from "./BotonCarrito";
import { categorias } from "@/data/categorias";

export default function Navbar() {
  return (
    <>
      {/* Navbar superior: logo, buscador y botones de sesión */}
      <nav className="navbar navbar-expand-lg navbar-poke">
        <div className="container-fluid">
          <Link className="navbar-brand d-inline-flex align-items-center" href="/">
            <img src="/assets/img/logo-tcg-duoc.svg" alt="TCG Duoc" width="40" height="40" />
            <span className="fw-bold ms-2 marca">TCG Duoc</span>
          </Link>
          <div className="collapse navbar-collapse justify-content-center">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
              <button className="btn btn-outline-warning" type="submit">Buscar</button>
            </form>
          </div>
          <div className="d-flex">
            <Link href="/iniciar-sesion" className="btn btn-outline-light ms-2 d-none d-md-inline-block">Iniciar Sesión</Link>
            <Link href="/crear-sesion" className="btn btn-primary ms-2 d-none d-md-inline-block">Crear Cuenta</Link>
            <BotonCarrito className="btn btn-poke d-lg-none ms-2" compacto />
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
      <nav className="navbar navbar-expand-lg navbar-poke d-none d-lg-block">
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
                    <li key={categoria.id}>
                      <Link className="dropdown-item" href={`/categorias/${categoria.slug}`}>{categoria.nombre}</Link>
                    </li>
                  ))}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" href="/categorias">Ver todas</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item"><NavLink href="/ofertas">Ofertas</NavLink></li>
              <li className="nav-item"><NavLink href="/nosotros">Nosotros</NavLink></li>
              <li className="nav-item"><NavLink href="/blog">Blog</NavLink></li>
              <li className="nav-item"><NavLink href="/contacto">Contacto</NavLink></li>
              <li className="nav-item">
                <BotonCarrito />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <MobileMenu />
    </>
  );
}