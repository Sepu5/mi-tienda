// Lógica pura de la compra (sin React ni localStorage).
import { calcularTotal } from "./carrito";

// Clave de localStorage donde se guarda la última orden
export const CLAVE_ORDEN = "ultimaCompra";

// Arma la orden con los datos del cliente y el carrito.
export function crearOrden(cliente, carrito, fecha = new Date()) {
  return {
    numero: Number(String(fecha.getTime()).slice(-8)),
    fecha: fecha.toISOString(),
    cliente,
    items: carrito,
    total: calcularTotal(carrito),
  };
}
