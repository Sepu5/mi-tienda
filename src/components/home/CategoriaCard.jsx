import Link from "next/link";

// Tarjeta de una categoría. Recibe sus datos por props.
export default function CategoriaCard({ categoria }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <img src={categoria.imagen} className="card-img-top" alt={categoria.nombre} />
        <div className="card-body">
          <h5 className="card-title">{categoria.nombre}</h5>
          <p className="card-text">{categoria.descripcion}</p>
          <Link href="/categorias" className="btn btn-primary">Explorar</Link>
        </div>
      </div>
    </div>
  );
}