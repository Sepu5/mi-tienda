import { formatearPrecio } from "@/lib/formato";

// Tabla de solo lectura con los productos de la compra.
export default function ResumenCompra({ items }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm align-middle">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.imagen} alt={item.nombre} width="50" />
              </td>
              <td>{item.nombre}</td>
              <td>{item.precio_nuevo === 0 ? "FREE" : formatearPrecio(item.precio_nuevo)}</td>
              <td>{item.cantidad}</td>
              <td>{formatearPrecio(item.precio_nuevo * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
