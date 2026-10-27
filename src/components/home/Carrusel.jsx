import { productos } from "@/data/productos";

// Busca un producto por su id para mostrar su carta en el slide
function carta(id) {
  return productos.find((p) => p.id === id);
}

// Cada slide tiene un degradado de fondo y 3 cartas (la del medio es más grande)
const slides = [
  {
    fondo: "linear-gradient(135deg, #E3350D, #FFCB05)",
    cartas: [carta(5), carta(1), carta(9)],
    titulo: "Bienvenido a TCG Duoc",
    texto: "Cartas del Set Base de Pokémon",
  },
  {
    fondo: "linear-gradient(135deg, #2A75BB, #8fd3f4)",
    cartas: [carta(15), carta(18), carta(17)],
    titulo: "Ofertas Especiales",
    texto: "Cartas holo con descuento",
  },
  {
    fondo: "linear-gradient(135deg, #6a3fb5, #f78fb3)",
    cartas: [carta(2), carta(4), carta(6)],
    titulo: "Cartas Gratis",
    texto: "Llévate una carta de energía gratis en tu compra",
  },
];

// Carrusel de Bootstrap. El JS que lo hace girar se carga con BootstrapClient.
export default function Carrusel() {
  return (
    <div id="carruselHome" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carruselHome"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
            <div
              className="d-flex justify-content-center align-items-center gap-3"
              style={{ height: "350px", background: slide.fondo }}
              role="img"
              aria-label={slide.titulo}
            >
              {slide.cartas.map((c, i) => {
                const medio = i === 1;
                return (
                  <img
                    key={c.id}
                    src={c.imagen}
                    alt={c.nombre}
                    className={medio ? "" : "d-none d-md-block"}
                    style={{
                      height: medio ? "270px" : "230px",
                      filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.45))",
                    }}
                  />
                );
              })}
            </div>
            <div className="carousel-caption d-none d-md-block">
              <h5>{slide.titulo}</h5>
              <p>{slide.texto}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carruselHome" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carruselHome" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}
