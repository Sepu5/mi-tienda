// Lógica pura del carrito (sin React ni localStorage).
// Cada función recibe el carrito y devuelve uno NUEVO, sin modificar el original.
// Así es fácil de probar con QUnit.

// Agrega un producto. Devuelve { carrito, error } (error es null o un mensaje).
export function agregarAlCarrito(carrito, producto) {
  const existente = carrito.find((item) => item.id === producto.id);

  if (!existente) {
    return { carrito: [...carrito, { ...producto, cantidad: 1 }], error: null };
  }

  if (existente.cantidad >= existente.stock) {
    return {
      carrito,
      error: `No puedes añadir más de ${existente.stock} unidades de ${existente.nombre}.`,
    };
  }

  // Los productos gratis se pueden llevar solo una vez por compra
  if (existente.precio_nuevo === 0) {
    return { carrito, error: "Solo puedes añadir un producto gratis por compra." };
  }

  return {
    carrito: carrito.map((item) =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
    ),
    error: null,
  };
}

// Suma (o resta) `delta` a la cantidad de un producto. Si queda en 0 o menos, se elimina.
export function cambiarCantidad(carrito, id, delta) {
  const existente = carrito.find((item) => item.id === id);
  if (!existente) return { carrito, error: null };

  if (delta > 0 && existente.cantidad >= existente.stock) {
    return {
      carrito,
      error: `No puedes añadir más de ${existente.stock} unidades de ${existente.nombre}.`,
    };
  }

  const nueva = existente.cantidad + delta;
  if (nueva <= 0) {
    return { carrito: eliminarDelCarrito(carrito, id), error: null };
  }

  return {
    carrito: carrito.map((item) => (item.id === id ? { ...item, cantidad: nueva } : item)),
    error: null,
  };
}

// Quita un producto del carrito.
export function eliminarDelCarrito(carrito, id) {
  return carrito.filter((item) => item.id !== id);
}

// Total a pagar: suma de precio_nuevo * cantidad.
export function calcularTotal(carrito) {
  return carrito.reduce((suma, item) => suma + item.precio_nuevo * item.cantidad, 0);
}

// Cantidad total de unidades en el carrito.
export function contarProductos(carrito) {
  return carrito.reduce((suma, item) => suma + item.cantidad, 0);
}
