"use client";

import Link from "next/link";
import { useCarrito } from "@/context/CartContext";
import { formatearPrecio } from "@/lib/formato";

// Botón verde del navbar: muestra el total y la cantidad de productos del carrito.
export default function BotonCarrito() {
  const { total, cantidadTotal } = useCarrito();

  return (
    <Link className="btn btn-success ms-5" href="/carrito">
      <strong>
        <i className="bi bi-cart4"></i> Carrito {formatearPrecio(total)}
      </strong>
      {cantidadTotal > 0 && <span className="badge text-bg-light ms-2">{cantidadTotal}</span>}
    </Link>
  );
}
