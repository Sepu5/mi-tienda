// Un campo de formulario con estilos de Bootstrap (is-invalid / is-valid + mensaje).
// Sirve para <input> (por defecto), <select> (type="select" + opciones como children)
// y <textarea> (type="textarea" + prop rows).
export default function Campo({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  tocado,
  placeholder,
  disabled = false,
  autoComplete,
  requerido = false,
  rows = 3,
  children,
}) {
  const mostrarError = tocado && error;
  const esValido = tocado && !error;
  const clase = `${type === "select" ? "form-select" : "form-control"} ${
    mostrarError ? "is-invalid" : ""
  } ${esValido ? "is-valid" : ""}`;

  const props = {
    id,
    name: id,
    className: clase,
    value,
    onChange,
    onBlur,
    disabled,
    "aria-invalid": mostrarError ? "true" : undefined,
    "aria-describedby": mostrarError ? `${id}-error` : undefined,
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {requerido && <small className="text-danger"> *</small>}
      {type === "select" ? (
        <select {...props}>{children}</select>
      ) : type === "textarea" ? (
        <textarea {...props} rows={rows} placeholder={placeholder} />
      ) : (
        <input {...props} type={type} placeholder={placeholder} autoComplete={autoComplete} />
      )}
      {mostrarError && (
        <div id={`${id}-error`} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
}