// Da formato chileno al precio: 5999 -> "$ 5.999"
export function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-CL");
}
