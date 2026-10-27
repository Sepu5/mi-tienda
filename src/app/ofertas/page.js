import ProductGrid from "@/components/productos/ProductGrid";
import { productos } from "@/data/productos";

export const metadata = { title: "Ofertas | TCG Duoc" };

export default function Ofertas() {
  const enOferta = productos.filter((p) => p.precio_descuento > p.precio_nuevo);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Ofertas</h1>
      <ProductGrid productos={enOferta} />
    </div>
  );
}