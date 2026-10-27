import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/productos/ProductGrid";
import { categorias } from "@/data/categorias";
import { productos } from "@/data/productos";
import { buscarCategoria, productosDeCategoria } from "@/lib/catalogo";

// Genera una página por cada tipo de carta al hacer el build
export function generateStaticParams() {
  return categorias.map((categoria) => ({ slug: categoria.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoria = buscarCategoria(categorias, slug);
  return {
    title: categoria
      ? `${categoria.nombre} | TCG Duoc`
      : "Categoría no encontrada | TCG Duoc",
  };
}

export default async function CategoriaDetalle({ params }) {
  const { slug } = await params;
  const categoria = buscarCategoria(categorias, slug);

  if (!categoria) notFound();

  const cartas = productosDeCategoria(productos, categoria.nombre);

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link href="/categorias">Categorías</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{categoria.nombre}</li>
        </ol>
      </nav>

      <h1>{categoria.nombre}</h1>
      <p className="lead">{categoria.descripcion}</p>
      <p className="text-muted">{cartas.length} {cartas.length === 1 ? "carta" : "cartas"}</p>

      {cartas.length > 0 ? (
        <ProductGrid productos={cartas} />
      ) : (
        <div className="alert alert-info">Todavía no hay cartas de este tipo.</div>
      )}

      <hr className="my-5" />
      <div className="d-flex flex-wrap gap-2 align-items-center">
        {categorias.map((c) => (
          <Link
            key={c.id}
            href={`/categorias/${c.slug}`}
            className={`btn btn-sm ${c.slug === categoria.slug ? "btn-primary" : "btn-outline-primary"}`}
          >
            {c.nombre}
          </Link>
        ))}
        <Link href="/categorias" className="ms-2">Ver todas las categorías</Link>
      </div>
    </div>
  );
}
