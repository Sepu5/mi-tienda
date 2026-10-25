import RegistroForm from "@/components/auth/RegistroForm";

export const metadata = { title: "Crear cuenta | Tienda de Videojuegos" };

export default function CrearSesion() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 mb-4 text-center">Crear cuenta</h1>
              <RegistroForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}