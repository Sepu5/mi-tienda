export const metadata = { title: "Nosotros | TCG Duoc" };

export default function Nosotros() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Nosotros</h1>
      <p className="lead">
        TCG Duoc es una tienda de cartas Pokémon creada por estudiantes de Duoc UC Sede Maipú
        (Franco Sepúlveda y Luis Grossolli) para el ramo DSY1104.
      </p>

      <div className="row g-3 mt-2">
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">Nuestra misión</h2>
              <p className="card-text">
                Acercar a los coleccionistas y jugadores las cartas del Set Base de Pokémon TCG, con
                precios claros en pesos chilenos y una compra simple y segura.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">¿Qué vendemos?</h2>
              <p className="card-text">
                Cartas del Set Base de 1999 de todos los tipos (fuego, agua, planta, eléctrico,
                psíquico y lucha): desde las comunes hasta las holo raras como Charizard, además de
                cartas de energía.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
