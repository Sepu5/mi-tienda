import Carrusel from "@/components/home/Carrusel";
import CategoriaCard from "@/components/home/CategoriaCard";
import ProductGrid from "@/components/productos/ProductGrid";
import { categorias } from "@/data/categorias";
import { productos } from "@/data/productos";

export default function Home() {
  const destacados = productos.slice(0, 6);
  const masVistos = productos.slice(6, 12);

  return (
    <>
      <Carrusel />

      {/* Categorías */}
      <section id="categorias" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Categorías</h2>
          <div className="row">
            {categorias.map((categoria) => (
              <CategoriaCard key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Productos</h2>
          <ProductGrid productos={destacados} />

          <h2 className="text-center mb-4">Los más vistos</h2>
          <ProductGrid productos={masVistos} />
        </div>
      </section>
    </>
  );
}