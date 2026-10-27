import Carrusel from "@/components/home/Carrusel";
import CategoriaCard from "@/components/home/CategoriaCard";
import ProductosHome from "@/components/productos/ProductosHome";
import { categorias } from "@/data/categorias";

export default function Home() {
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

      {/* Productos (vienen desde la fake-api) */}
      <section id="productos" className="py-5 bg-light">
        <div className="container">
          <ProductosHome />
        </div>
      </section>
    </>
  );
}