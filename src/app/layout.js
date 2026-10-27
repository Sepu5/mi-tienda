import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AvisoCarrito from "@/components/carrito/AvisoCarrito";
import { CartProvider } from "@/context/CartContext";

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
        {/* CartProvider comparte el carrito con todos los componentes */}
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AvisoCarrito />
        </CartProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}