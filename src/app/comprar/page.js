import FormularioCompra from "@/components/compra/FormularioCompra";

export const metadata = { title: "Comprar | Tienda de Videojuegos" };

export default function ComprarPage() {
  return (
    <section className="py-3">
      <div className="container">
        <FormularioCompra />
      </div>
    </section>
  );
}
