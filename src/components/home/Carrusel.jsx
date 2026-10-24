const slides = [
  {
    imagen: "/assets/img/banner.png",
    titulo: "Nuevos Lanzamientos",
    texto: "Descubre los últimos juegos disponibles en nuestra tienda.",
  },
  {
    imagen: "/assets/img/banner2.png",
    titulo: "Ofertas Especiales",
    texto: "Aprovecha nuestros descuentos exclusivos.",
  },
  {
    imagen: "/assets/img/dino2.png",
    titulo: "Juegos Más Vendidos",
    texto: "Explora los títulos más populares entre nuestros clientes.",
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
            <img
              src={slide.imagen}
              className="d-block w-100"
              alt={slide.titulo}
              style={{ height: "350px", objectFit: "cover" }}
            />
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