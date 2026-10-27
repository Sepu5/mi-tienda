"use client";

import Link from "next/link";
import { useCarrito } from "@/context/CartContext";
import { formatearPrecio } from "@/lib/formato";

// Botón del carrito: muestra el total y la cantidad de productos del carrito.
// `compacto` deja solo el ícono y el total (para la barra del celular).
export default function BotonCarrito({ className = "btn btn-poke ms-5", compacto = false }) {
  const { total, cantidadTotal } = useCarrito();

  return (
    <Link className={className} href="/carrito">
      <strong>
        <i className="bi bi-cart4"></i>
        {compacto ? " " : " Carrito "}
        {formatearPrecio(total)}
      </strong>
      {cantidadTotal > 0 && <span className="badge text-bg-light ms-2">{cantidadTotal}</span>}
    </Link>
  );
}
