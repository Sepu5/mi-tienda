import CategoriaCard from "@/components/home/CategoriaCard";
import ProductGrid from "@/components/productos/ProductGrid";
import { categorias } from "@/data/categorias";
import { productos } from "@/data/productos";

export const metadata = { title: "Categorías | Tienda de Videojuegos" };

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
          <h2 className="mb-3">{categoria.nombre}</h2>
          <ProductGrid
            productos={productos.filter((p) => p.categoria === categoria.nombre)}
          />
        </section>
      ))}
    </div>
  );
}