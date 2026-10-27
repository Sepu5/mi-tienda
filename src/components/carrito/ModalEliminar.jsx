"use client";

// Modal de confirmación controlado por React (sin el JS de Bootstrap):
// se muestra solo cuando `producto` no es null.
export default function ModalEliminar({ producto, onConfirmar, onCancelar }) {
  if (!producto) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancelar}></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro de que deseas eliminar este producto del carrito?
              <p className="fw-bold mb-0 mt-2">{producto.nombre}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancelar}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={onConfirmar}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
