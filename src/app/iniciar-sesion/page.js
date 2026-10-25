import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Iniciar sesión | Tienda de Videojuegos" };

export default function IniciarSesion() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 mb-4 text-center">Iniciar sesión</h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}