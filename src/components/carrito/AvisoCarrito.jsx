"use client";

import { useEffect } from "react";
import { useCarrito } from "@/context/CartContext";

// Alerta flotante (abajo a la derecha) que se cierra sola a los 3 segundos.
export default function AvisoCarrito() {
  const { aviso, cerrarAviso } = useCarrito();

  useEffect(() => {
    if (!aviso) return;
    const temporizador = setTimeout(cerrarAviso, 3000);
    // Limpieza: si el aviso cambia o se cierra antes, cancelamos el temporizador
    return () => clearTimeout(temporizador);
  }, [aviso, cerrarAviso]);

  if (!aviso) return null;

  return (
    <div
      className={`alert alert-${aviso.tipo} alert-dismissible position-fixed bottom-0 end-0 m-3 shadow`}
      style={{ zIndex: 1080 }}
      role="alert"
    >
      {aviso.texto}
      <button type="button" className="btn-close" aria-label="Cerrar" onClick={cerrarAviso}></button>
    </div>
  );
}
