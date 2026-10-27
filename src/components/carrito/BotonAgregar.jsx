"use client";

import { useCarrito } from "@/context/CartContext";

// Botón "Añadir": agrega el producto al carrito.
export default function BotonAgregar({ producto, className = "btn btn-dark" }) {
  const { agregar } = useCarrito();

  function handleClick() {
    agregar(producto);
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      <i className="bi bi-cart-plus"></i> Añadir
    </button>
  );
}
