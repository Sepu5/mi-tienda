"use client";

import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import { API_URL } from "@/lib/api";

// Carga los productos desde la fake-api con fetch + useEffect
// (igual que el ejemplo hola-mundo) y muestra estado de carga y error.
export default function ProductosHome() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarProductos() {
      try {
        const respuesta = await fetch(`${API_URL}/productos`);
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al pedir los productos`);
        }
        const datos = await respuesta.json();
        if (!cancelado) setProductos(datos);
      } catch (err) {
        if (!cancelado) {
          setError(
            "No se pudieron cargar los productos. ¿Está corriendo la fake-api (npm run api)?"
          );
        }
        console.error(err);
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarProductos();

    // Si el componente se desmonta antes de terminar, no actualizamos el estado.
    return () => {
      cancelado = true;
    };
  }, []);

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
        <p className="mt-3 mb-0">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  const destacados = productos.slice(0, 6);
  const masVistos = productos.slice(6, 12);

  return (
    <>
      <h2 className="text-center mb-4">Productos</h2>
      <ProductGrid productos={destacados} />

      <h2 className="text-center mb-4">Los más vistos</h2>
      <ProductGrid productos={masVistos} />
    </>
  );
}