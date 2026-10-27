import ResultadoCompra from "@/components/compra/ResultadoCompra";

export const metadata = { title: "Error en el pago | Tienda de Videojuegos" };

export default function ErrorPagoPage() {
  return (
    <section className="py-3">
      <div className="container">
        <ResultadoCompra exito={false} />
      </div>
    </section>
  );
}
