import ContactoForm from "@/components/contacto/ContactoForm";

export const metadata = { title: "Contacto | Tienda de Videojuegos" };

export default function Contacto() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Contacto</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              <ContactoForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
