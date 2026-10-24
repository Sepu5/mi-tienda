import ProductGrid from "@/components/productos/ProductGrid";
import { productos } from "@/data/productos";

export default function Home() {
  // slice(0, 6) toma los primeros 6 productos; slice(6, 12) los 6 siguientes
  const destacados = productos.slice(0, 6);
  const masVistos = productos.slice(6, 12);

  return (
    <section id="productos" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Productos</h2>
        <ProductGrid productos={destacados} />

        <h2 className="text-center mb-4">Los más vistos</h2>
        <ProductGrid productos={masVistos} />
      </div>
    </section>
  );
}