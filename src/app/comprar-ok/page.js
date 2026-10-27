import ResultadoCompra from "@/components/compra/ResultadoCompra";

export const metadata = { title: "Compra exitosa | Tienda de Videojuegos" };

export default function CompraExitosaPage() {
  return (
    <section className="py-3">
      <div className="container">
        <ResultadoCompra exito />
      </div>
    </section>
  );
}
