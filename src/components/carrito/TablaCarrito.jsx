"use client";

import { useState } from "react";
import Link from "next/link";
import { useCarrito } from "@/context/CartContext";
import { formatearPrecio } from "@/lib/formato";
import FilaCarrito from "./FilaCarrito";
import ModalEliminar from "./ModalEliminar";

// Tabla del carrito con total, botones Limpiar / Comprar ahora y modal de confirmación.
export default function TablaCarrito() {
  const { carrito, total, cambiar, eliminar, limpiar } = useCarrito();
  // Producto que se quiere eliminar (null = modal cerrado)
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  function handleEliminar(item) {
    setProductoAEliminar(item);
  }

  function handleConfirmar() {
    eliminar(productoAEliminar.id);
    setProductoAEliminar(null);
  }

  function handleCancelar() {
    setProductoAEliminar(null);
  }

  function handleLimpiar() {
    limpiar();
  }

  if (carrito.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        Tu carrito está vacío. <Link href="/">Ver productos</Link>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <FilaCarrito key={item.id} item={item} onCambiar={cambiar} onEliminar={handleEliminar} />
            ))}
            <tr className="fw-bold">
              <td colSpan="4" className="text-end">Total</td>
              <td colSpan="2">{formatearPrecio(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-end">
        <button type="button" className="btn btn-secondary btn-lg me-2" onClick={handleLimpiar}>
          Limpiar
        </button>
        <Link href="/comprar" className="btn btn-success btn-lg">
          Comprar ahora
        </Link>
      </div>

      <ModalEliminar
        producto={productoAEliminar}
        onConfirmar={handleConfirmar}
        onCancelar={handleCancelar}
      />
    </>
  );
}
