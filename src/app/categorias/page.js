import CategoriaCard from "@/components/home/CategoriaCard";
import ProductGrid from "@/components/productos/ProductGrid";
import { categorias } from "@/data/categorias";
import { productos } from "@/data/productos";
import { productosDeCategoria } from "@/lib/catalogo";
import Link from "next/link";

export const metadata = { title: "Categorías | TCG Duoc" };

export default function Categorias() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Categorías</h1>
      <div className="row mb-5">
        {categorias.map((categoria) => (
          <CategoriaCard key={categoria.id} categoria={categoria} />
        ))}
      </div>

      {categorias.map((categoria) => (
        <section key={categoria.id} className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mb-0">{categoria.nombre}</h2>
            <Link href={`/categorias/${categoria.slug}`} className="btn btn-link">
              Ver solo {categoria.nombre}
            </Link>
          </div>
          <ProductGrid productos={productosDeCategoria(productos, categoria.nombre)} />
        </section>
      ))}
    </div>
  );
}