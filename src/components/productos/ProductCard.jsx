import Link from "next/link";
import BotonAgregar from "@/components/carrito/BotonAgregar";
import { formatearPrecio } from "@/lib/formato";

// Tarjeta de un producto. Recibe el producto por props, igual que ProductRow en hola-mundo.
export default function ProductCard({ producto }) {
  const esGratis = producto.precio_nuevo === 0;

  return (
    <div className="col">
      <div className="card card-producto h-100">
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
        <div className="card-body d-flex flex-column">
          <Link href={`/productos/${producto.id}`} className="link-none">
            <p className="card-title mb-0">{producto.nombre}</p>
          </Link>
          <small className="text-muted">{producto.categoria}</small>
          <div className="d-flex flex-column my-3">
            <span className="precio-descuento text-decoration-line-through">
              {formatearPrecio(producto.precio_descuento)}
            </span>
            <span className="precio-nuevo fw-bolder">
              {esGratis ? "FREE" : formatearPrecio(producto.precio_nuevo)}
            </span>
            <small className="text-muted">Stock disponible: {producto.stock}</small>
          </div>
          <div className="d-grid gap-2 mt-auto">
            <Link className="btn btn-outline-dark" href={`/productos/${producto.id}`}>Ver</Link>
            <BotonAgregar producto={producto} />
          </div>
        </div>
      </div>
    </div>
  );
}