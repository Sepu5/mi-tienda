"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DatosCliente from "@/components/compra/DatosCliente";
import ResumenCompra from "@/components/compra/ResumenCompra";
import { CLAVE_ORDEN } from "@/lib/compra";
import { formatearPrecio } from "@/lib/formato";

// Pantalla final de la compra. exito=true -> compra pagada, exito=false -> pago rechazado.
export default function ResultadoCompra({ exito }) {
  const [orden, setOrden] = useState(null);
  const [emailEnviado, setEmailEnviado] = useState(false);

  // Leer la última orden guardada (localStorage solo existe en el navegador)
  useEffect(() => {
    try {
      const guardada = JSON.parse(localStorage.getItem(CLAVE_ORDEN));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (guardada && guardada.cliente && Array.isArray(guardada.items)) setOrden(guardada);
    } catch (err) {
      console.error("No se pudo leer la orden guardada", err);
    }
  }, []);

  function handleImprimir() {
    window.print();
  }

  function handleEnviarEmail() {
    setEmailEnviado(true);
  }

  // La página de éxito solo muestra órdenes pagadas y la de error solo las rechazadas
  const estadoEsperado = exito ? "pagada" : "rechazada";

  if (!orden || orden.estado !== estadoEsperado) {
    return (
      <div className="alert alert-warning" role="alert">
        No hay una compra reciente. <Link href="/">Ir al inicio</Link>
      </div>
    );
  }

  if (exito) {
    return (
      <>
        <p className="text-end small mb-1">Código orden: ORDER{orden.numero}</p>
        <h3 className="mb-4">
          <i className="bi bi-check-circle text-success"></i> Se ha realizado la compra. nro #
          {orden.numero}
        </h3>

        <DatosCliente cliente={orden.cliente} />
        <ResumenCompra items={orden.items} />

        <div className="card text-center mx-auto my-4" style={{ maxWidth: "320px" }}>
          <div className="card-body fw-bold">Total pagado: {formatearPrecio(orden.total)}</div>
        </div>

        {emailEnviado && (
          <div className="alert alert-success" role="alert">
            Se ha enviado la boleta a {orden.cliente.correo}
          </div>
        )}

        <div className="d-flex gap-2 justify-content-center">
          <button type="button" className="btn btn-danger btn-sm" onClick={handleImprimir}>
            Imprimir boleta en PDF
          </button>
          <button type="button" className="btn btn-success btn-sm" onClick={handleEnviarEmail}>
            Enviar boleta por email
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="mb-3">
        <i className="bi bi-x-circle text-danger"></i> No se pudo realizar el pago. nro #
        {orden.numero}
      </h3>
      <p>Detalle de compra</p>

      <div className="text-center mb-4">
        <Link href="/comprar" className="btn btn-success btn-lg">
          VOLVER A REALIZAR EL PAGO
        </Link>
      </div>

      <DatosCliente cliente={orden.cliente} />
      <ResumenCompra items={orden.items} />

      <div className="card text-center mx-auto my-4" style={{ maxWidth: "320px" }}>
        <div className="card-body fw-bold">Total: {formatearPrecio(orden.total)}</div>
      </div>
    </>
  );
}
