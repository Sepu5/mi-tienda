"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const categorias = ["Acción", "Aventura", "Estrategia"];

// Menú lateral (offcanvas) que se abre en celulares con el botón de la Navbar.
export default function MobileMenu() {
  const pathname = usePathname();

  // Cada vez que cambia la ruta, cierra el offcanvas
  useEffect(() => {
    const el = document.getElementById("offcanvasMobileMenu");
    if (!el) return;
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((mod) => {
      const bs = mod.default ?? mod;
      bs.Offcanvas.getInstance(el)?.hide();
    });
  }, [pathname]);

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasMobileMenu"
      aria-labelledby="offcanvasMobileMenuLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasMobileMenuLabel">Menú</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
      </div>

      <div className="offcanvas-body">
        {/* Tarjeta del usuario */}
        <div className="card">
          <div className="row g-0">
            <div className="col-4 d-flex align-items-center justify-content-center">
              <img src="/assets/img/face-programador2.png" alt="Avatar" className="avatar rounded-pill" />
            </div>
            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title">Nombre del Usuario</h5>
                <p className="card-text">correo@ejemplo.com</p>
                <div className="d-flex justify-content-between">
                  <Link href="#" className="btn btn-primary btn-sm">Ver Perfil</Link>
                  <Link href="#" className="btn btn-danger btn-sm">Cerrar Sesión</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex my-3">
          <Link href="/iniciar-sesion" className="btn btn-outline-primary ms-2">Iniciar Sesión</Link>
          <Link href="/crear-sesion" className="btn btn-primary ms-2">Crear Cuenta</Link>
        </div>

        <ul className="list-group">
          <li className="list-group-item">
            <div className="accordion accordion-flush" id="accordionMenu">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseCategorias"
                    aria-expanded="false"
                    aria-controls="collapseCategorias"
                  >
                    Categorías
                  </button>
                </h2>
                <div id="collapseCategorias" className="accordion-collapse collapse" data-bs-parent="#accordionMenu">
                  <ul className="list-group">
                    {categorias.map((categoria) => (
                      <li key={categoria} className="list-group-item">
                        <Link href="/categorias" className="link-none">{categoria}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item"><Link href="/ofertas" className="link-none">Ofertas</Link></li>
          <li className="list-group-item"><Link href="#" className="link-none">Historial</Link></li>
        </ul>
      </div>
    </div>
  );
}