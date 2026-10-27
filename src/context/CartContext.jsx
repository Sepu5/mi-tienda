"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  agregarAlCarrito,
  cambiarCantidad,
  eliminarDelCarrito,
  calcularTotal,
  contarProductos,
} from "@/lib/carrito";

// Context: permite compartir el carrito con toda la app sin pasar props de componente en componente.
const CartContext = createContext(null);

const CLAVE = "cart"; // misma clave de localStorage que la plantilla HTML

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [aviso, setAviso] = useState(null);
  // Indica si ya leímos localStorage (para no pisarlo con el carrito vacío inicial)
  const [cargado, setCargado] = useState(false);

  // Al montar: leer el carrito guardado (se hace en useEffect para evitar errores de hidratación)
  useEffect(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem(CLAVE));
      // localStorage solo existe en el navegador, por eso se lee aquí y no al declarar el estado
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(guardado)) setCarrito(guardado);
    } catch (err) {
      console.error("No se pudo leer el carrito guardado", err);
    }
    setCargado(true);
  }, []);

  // Cada vez que cambia el carrito, lo guardamos (solo después de haber cargado)
  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(carrito));
    } catch (err) {
      console.error("No se pudo guardar el carrito", err);
    }
  }, [carrito, cargado]);

  function agregar(producto) {
    const resultado = agregarAlCarrito(carrito, producto);
    if (resultado.error) {
      setAviso({ tipo: "warning", texto: resultado.error });
      return;
    }
    setCarrito(resultado.carrito);
    setAviso({ tipo: "success", texto: `${producto.nombre} se añadió al carrito.` });
  }

  function cambiar(id, delta) {
    const resultado = cambiarCantidad(carrito, id, delta);
    if (resultado.error) {
      setAviso({ tipo: "warning", texto: resultado.error });
      return;
    }
    setCarrito(resultado.carrito);
  }

  function eliminar(id) {
    setCarrito(eliminarDelCarrito(carrito, id));
  }

  function limpiar() {
    setCarrito([]);
  }

  function cerrarAviso() {
    setAviso(null);
  }

  const valor = {
    carrito,
    total: calcularTotal(carrito),
    cantidadTotal: contarProductos(carrito),
    agregar,
    cambiar,
    eliminar,
    limpiar,
    aviso,
    cerrarAviso,
  };

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

// Hook para usar el carrito desde cualquier componente cliente
export function useCarrito() {
  const contexto = useContext(CartContext);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de un CartProvider");
  }
  return contexto;
}
