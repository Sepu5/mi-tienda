import Link from "next/link";

// Da formato chileno al precio: 5999 -> "$ 5.999"
function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-CL");
}

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
          </div>
          <div className="d-grid mt-auto">
            <Link className="btn btn-dark" href={`/productos/${producto.id}`}>Ver</Link>
          </div>
        </div>
      </div>
    </div>
  );
}