// Reglas de validación compartidas por Iniciar sesión y Crear cuenta.
// Cada función devuelve un objeto de errores: { campo: "mensaje" }.
// Si el objeto está vacío, el formulario es válido.

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validarCorreo(correo) {
  if (!correo.trim()) return "Debes escribir tu correo.";
  if (!REGEX_CORREO.test(correo.trim())) return "El correo no tiene un formato válido.";
  return "";
}

function validarContrasena(contrasena) {
  if (!contrasena) return "Debes escribir tu contraseña.";
  if (contrasena.length < 4 || contrasena.length > 10) {
    return "La contraseña debe tener entre 4 y 10 caracteres.";
  }
  return "";
}

function limpiar(errores) {
  // Deja solo los campos que realmente tienen un mensaje
  return Object.fromEntries(Object.entries(errores).filter(([, mensaje]) => mensaje));
}

export function validarLogin({ correo, contrasena }) {
  return limpiar({
    correo: validarCorreo(correo),
    contrasena: !contrasena ? "Debes escribir tu contraseña." : "",
  });
}

export function validarRegistro({ nombre, correo, contrasena, confirmar, region, comuna }) {
  return limpiar({
    nombre: !nombre.trim()
      ? "Debes escribir tu nombre."
      : nombre.trim().length < 3
        ? "El nombre debe tener al menos 3 caracteres."
        : "",
    correo: validarCorreo(correo),
    contrasena: validarContrasena(contrasena),
    confirmar: !confirmar
      ? "Debes confirmar tu contraseña."
      : confirmar !== contrasena
        ? "Las contraseñas no coinciden."
        : "",
    region: !region ? "Selecciona una región." : "",
    comuna: !comuna ? "Selecciona una comuna." : "",
  });
}