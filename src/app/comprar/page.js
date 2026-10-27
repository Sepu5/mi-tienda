import FormularioCompra from "@/components/compra/FormularioCompra";

export const metadata = { title: "Comprar | TCG Duoc" };

export default function ComprarPage() {
  return (
    <section className="py-3">
      <div className="container">
        <FormularioCompra />
      </div>
    </section>
  );
}
