// Crea un navegador falso (jsdom) para poder dibujar componentes React en Node.
import globalJsdom from "global-jsdom";
globalJsdom(undefined, { url: "http://localhost/" });
// Le dice a React que estamos en un entorno de pruebas
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
