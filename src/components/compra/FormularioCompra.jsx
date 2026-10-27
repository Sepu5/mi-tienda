"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Campo from "@/components/auth/Campo";
import ResumenCompra from "@/components/compra/ResumenCompra";
import { useCarrito } from "@/context/CartContext";
import { zonas } from "@/data/zonas";
import { validarCompra } from "@/lib/validaciones";
import { crearOrden, CLAVE_ORDEN } from "@/lib/compra";
import { formatearPrecio } from "@/lib/formato";

const INICIAL = {
  nombre: "",
  apellidos: "",
  correo: "",
  calle: "",
  departamento: "",
  region: "",
  comuna: "",
  indicaciones: "",
};

export default function FormularioCompra() {
  const { carrito, total, limpiar } = useCarrito();
  const router = useRouter();

  const [valores, setValores] = useState(INICIAL);
  const [tocados, setTocados] = useState({});
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [simularError, setSimularError] = useState(false);

  const errores = validarCompra(valores);

  // Comunas de la región elegida (vacío si aún no se elige región)
  const comunas = zonas.find((z) => z.id === valores.region)?.comunas ?? [];

  function handleChange(e) {
    const { name, value } = e.target;
    setValores((prev) => ({
      ...prev,
      [name]: value,
      // Al cambiar de región, la comuna anterior ya no es válida
      ...(name === "region" ? { comuna: "" } : {}),
    }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
  }

  function handleSimularError(e) {
    setSimularError(e.target.checked);
  }

  function guardarOrden(orden) {
    try {
      localStorage.setItem(CLAVE_ORDEN, JSON.stringify(orden));
    } catch (err) {
      console.error("No se pudo guardar la orden", err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIntentoEnvio(true);
    if (Object.keys(errores).length > 0) return; // no avanza con datos inválidos

    const orden = crearOrden(valores, carrito);

    if (simularError) {
      // Pago rechazado: el carrito se mantiene para reintentar
      guardarOrden({ ...orden, estado: "rechazada" });
      router.push("/comprar-error");
      return;
    }

    guardarOrden({ ...orden, estado: "pagada" });
    limpiar();
    router.push("/comprar-ok");
  }

  const mostrar = (campo) => tocados[campo] || intentoEnvio;

  if (carrito.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        Tu carrito está vacío. <Link href="/">Ver productos</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <h2>Carrito de compra</h2>
          <p className="mb-0">Completa la siguiente información</p>
        </div>
        <div className="btn btn-primary py-3">
          Total a pagar: <strong>{formatearPrecio(total)}</strong>
        </div>
      </div>

      <ResumenCompra items={carrito} />

      <h4 className="mt-4">Información del cliente</h4>
      <div className="row">
        <div className="col-md-4">
          <Campo
            id="nombre"
            label="Nombre"
            requerido
            autoComplete="given-name"
            value={valores.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.nombre}
            tocado={mostrar("nombre")}
          />
        </div>
        <div className="col-md-4">
          <Campo
            id="apellidos"
            label="Apellidos"
            requerido
            autoComplete="family-name"
            value={valores.apellidos}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.apellidos}
            tocado={mostrar("apellidos")}
          />
        </div>
        <div className="col-md-4">
          <Campo
            id="correo"
            label="Correo"
            type="email"
            requerido
            autoComplete="email"
            value={valores.correo}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.correo}
            tocado={mostrar("correo")}
          />
        </div>
      </div>

      <h4 className="mt-3">Dirección de entrega de los productos</h4>
      <div className="row">
        <div className="col-md-8">
          <Campo
            id="calle"
            label="Calle"
            requerido
            autoComplete="address-line1"
            value={valores.calle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.calle}
            tocado={mostrar("calle")}
          />
        </div>
        <div className="col-md-4">
          <Campo
            id="departamento"
            label="Departamento (opcional)"
            placeholder="Ej: 603"
            autoComplete="address-line2"
            value={valores.departamento}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.departamento}
            tocado={mostrar("departamento")}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Campo
            id="region"
            label="Región"
            type="select"
            requerido
            value={valores.region}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.region}
            tocado={mostrar("region")}
          >
            <option value="">Selecciona una región</option>
            {zonas.map((z) => (
              <option key={z.id} value={z.id}>
                {z.nombre}
              </option>
            ))}
          </Campo>
        </div>
        <div className="col-md-6">
          <Campo
            id="comuna"
            label="Comuna"
            type="select"
            requerido
            value={valores.comuna}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.comuna}
            tocado={mostrar("comuna")}
            disabled={!valores.region}
          >
            <option value="">
              {valores.region ? "Selecciona una comuna" : "Primero elige una región"}
            </option>
            {comunas.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Campo>
        </div>
      </div>

      <Campo
        id="indicaciones"
        label="Indicaciones para la entrega (opcional)"
        type="textarea"
        placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
        value={valores.indicaciones}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.indicaciones}
        tocado={mostrar("indicaciones")}
      />

      <div className="form-check mb-3">
        <input
          id="simularError"
          type="checkbox"
          className="form-check-input"
          checked={simularError}
          onChange={handleSimularError}
        />
        <label htmlFor="simularError" className="form-check-label">
          Simular pago rechazado (solo para probar)
        </label>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-success btn-lg">
          Pagar ahora {formatearPrecio(total)}
        </button>
      </div>
    </form>
  );
}
