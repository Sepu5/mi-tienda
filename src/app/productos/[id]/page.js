import Link from "next/link";
import { notFound } from "next/navigation";
import { productos } from "@/data/productos";

function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-CL");
}

export default async function ProductoDetalle({ params }) {
  const { id } = await params;
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) notFound();

  const esGratis = producto.precio_nuevo === 0;

  return (
    <div className="container py-5">
      <Link href="/" className="btn btn-outline-secondary mb-4">
        ← Volver
      </Link>

      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h1>{producto.nombre}</h1>
          <p className="text-muted">{producto.categoria}</p>
          <p>{producto.descripcion}</p>

          <p>
            <del className="text-muted">
              {formatearPrecio(producto.precio_descuento)}
            </del>{" "}
            <strong className="fs-4">
              {esGratis ? "FREE" : formatearPrecio(producto.precio_nuevo)}
            </strong>
          </p>

          <p>Stock: {producto.stock}</p>
        </div>
      </div>
    </div>
  );
}