import ProductCard from "./ProductCard";

// Grilla de productos: dibuja una ProductCard por cada producto de la lista.
export default function ProductGrid({ productos }) {
  return (
    <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3 mb-4">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}