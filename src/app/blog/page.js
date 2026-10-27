export const metadata = { title: "Blog | TCG Duoc" };

const entradas = [
  {
    id: 1,
    titulo: "Las cartas más buscadas del Set Base",
    fecha: "12 de octubre de 2026",
    autor: "Equipo TCG Duoc",
    texto:
      "Charizard, Blastoise y Venusaur lideran la lista de las cartas holo más buscadas del Set Base de 1999. Repasamos por qué siguen siendo las favoritas de los coleccionistas.",
  },
  {
    id: 2,
    titulo: "Cómo cuidar tus cartas: fundas y carpetas",
    fecha: "5 de octubre de 2026",
    autor: "Equipo TCG Duoc",
    texto:
      "Usa fundas protectoras, guárdalas en carpetas con hojas sin PVC y mantenlas lejos de la humedad y del sol para que conserven su estado.",
  },
  {
    id: 3,
    titulo: "Novedades de TCG Duoc: carta de energía gratis",
    fecha: "28 de septiembre de 2026",
    autor: "Equipo TCG Duoc",
    texto:
      "Ahora puedes llevarte una carta de energía gratis en tu compra. Revisa la sección de Ofertas para ver las cartas holo con descuento.",
  },
];

export default function Blog() {
  return (
    <div className="container py-5">
      <h1 className="mb-2">Blog</h1>
      <p className="text-muted mb-4">
        Noticias y consejos del mundo Pokémon TCG
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