import TablaCarrito from "@/components/carrito/TablaCarrito";

export const metadata = { title: "Carrito | TCG Duoc" };

export default function CarritoPage() {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-4">Carrito de compras</h1>
        <TablaCarrito />
      </div>
    </section>
  );
}
