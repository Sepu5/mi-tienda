export const metadata = { title: "Blog | Tienda de Videojuegos" };

const entradas = [
  {
    id: 1,
    titulo: "Los 5 juegos retro que no pueden faltar en tu colección",
    fecha: "12 de octubre de 2026",
    autor: "Luis",
    texto:
      "Coleccionar videojuegos clásicos es una aventura en sí misma. En esta lista repasamos cinco títulos que marcaron una época y que siguen siendo igual de entretenidos hoy.",
  },
  {
    id: 2,
    titulo: "Cómo cuidar tus cartuchos y consolas antiguas",
    fecha: "5 de octubre de 2026",
    autor: "Equipo RetroGaming Haven",
    texto:
      "Mantén los cartuchos lejos de la humedad, límpialos con alcohol isopropílico y guarda las consolas en un lugar fresco y seco.",
  },
  {
    id: 3,
    titulo: "Novedades de la tienda: llegaron los packs de ofertas",
    fecha: "28 de septiembre de 2026",
    autor: "Equipo RetroGaming Haven",
    texto:
      "Este mes sumamos nuevos packs de juegos con descuentos de hasta un 40%. Revisa la sección de Ofertas.",
  },
];

export default function Blog() {
  return (
    <div className="container py-5">
      <h1 className="mb-2">Blog</h1>
      <p className="text-muted mb-4">
        Novedades, reseñas y noticias del mundo de los videojuegos.
      </p>

      <div className="row">
        {entradas.map((entrada) => (
          <div key={entrada.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5 card-title">{entrada.titulo}</h2>
                <p className="text-muted small">
                  {entrada.fecha} · {entrada.autor}
                </p>
                <p className="card-text">{entrada.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}