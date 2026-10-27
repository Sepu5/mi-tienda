export default function Footer() {
  return (
    <footer className="footer-poke text-light text-center py-3">
      <div className="container-fluid">
        <iframe
          title="Mapa Duoc UC Sede Maipú"
          src="https://www.google.com/maps?q=Duoc+UC+Sede+Maip%C3%BA,+Av.+Esquina+Blanca+501,+Maip%C3%BA&output=embed"
          width="100%"
          height="300px"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className="mt-2 mb-1">Duoc UC Sede Maipú · Av. Esquina Blanca 501, Maipú</p>
      <p className="mb-1">&copy; 2026 TCG Duoc</p>
      <small>
        Imágenes de cartas: Pokémon TCG API (pokemontcg.io). Pokémon y sus marcas pertenecen a Nintendo, Creatures y
        GAME FREAK / The Pokémon Company. Proyecto académico sin fines comerciales.
      </small>
    </footer>
  );
}