import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar"; 

export const metadata = {
  title: "Tienda de Videojuegos",
  description: "Tienda en línea de videojuegos",
};

// El layout es el "molde" de todas las páginas.
// {children} es la página que se está visitando.
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BootstrapClient />
      </body>
    </html>
  );
}