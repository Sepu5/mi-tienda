import { zonas } from "@/data/zonas";

// Muestra en modo lectura los datos del cliente de una orden.
export default function DatosCliente({ cliente }) {
  // El cliente guarda el id de la región; buscamos su nombre
  const nombreRegion = zonas.find((z) => z.id === cliente.region)?.nombre ?? cliente.region;

  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <h5>Información del cliente</h5>
        <ul className="list-unstyled">
          <li><strong>Nombre:</strong> {cliente.nombre}</li>
          <li><strong>Apellidos:</strong> {cliente.apellidos}</li>
          <li><strong>Correo:</strong> {cliente.correo}</li>
        </ul>
      </div>
      <div className="col-md-6">
        <h5>Dirección de entrega</h5>
        <ul className="list-unstyled">
          <li><strong>Calle:</strong> {cliente.calle}</li>
          {cliente.departamento && (
            <li><strong>Departamento:</strong> {cliente.departamento}</li>
          )}
          <li><strong>Región:</strong> {nombreRegion}</li>
          <li><strong>Comuna:</strong> {cliente.comuna}</li>
          {cliente.indicaciones && (
            <li><strong>Indicaciones:</strong> {cliente.indicaciones}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
