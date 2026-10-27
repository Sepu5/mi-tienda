import Link from "next/link";

// Tarjeta de una categoría. Recibe sus datos por props.
export default function CategoriaCard({ categoria }) {
  return (
    <div className="col-6 col-md-4 mb-3">
      <div className="card h-100">
        <img
          src={categoria.imagen}
          className="card-img-top"
          alt={categoria.nombre}
          style={{ height: "220px", objectFit: "contain", background: "#f4f6fb", padding: "10px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{categoria.nombre}</h5>
          <p className="card-text">{categoria.descripcion}</p>
          <Link href={`/categorias/${categoria.slug}`} className="btn btn-primary">Explorar</Link>
        </div>
      </div>
    </div>
  );
}