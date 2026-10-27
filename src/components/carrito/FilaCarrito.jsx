import { formatearPrecio } from "@/lib/formato";

// Una fila de la tabla del carrito. Recibe el item y avisa al padre con onCambiar / onEliminar.
export default function FilaCarrito({ item, onCambiar, onEliminar }) {
  const esGratis = item.precio_nuevo === 0;

  return (
    <tr>
      <td>
        <img src={item.imagen} alt={item.nombre} width="50" />
      </td>
      <td>{item.nombre}</td>
      <td>{esGratis ? "FREE" : formatearPrecio(item.precio_nuevo)}</td>
      <td>
        {/* Los productos gratis no muestran botones +/- */}
        {!esGratis && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onCambiar(item.id, -1)}
            disabled={item.cantidad === 1}
            aria-label="Restar una unidad"
          >
            -
          </button>
        )}{" "}
        <span className="mx-2">{item.cantidad}</span>{" "}
        {!esGratis && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onCambiar(item.id, 1)}
            disabled={item.cantidad >= item.stock}
            aria-label="Sumar una unidad"
          >
            +
          </button>
        )}
      </td>
      <td>{formatearPrecio(item.precio_nuevo * item.cantidad)}</td>
      <td>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => onEliminar(item)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}
