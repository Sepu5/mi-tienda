// Lógica pura del catálogo (sin React): buscar categorías y filtrar productos.

// Devuelve la categoría que tiene ese slug, o null si no existe
export function buscarCategoria(categorias, slug) {
  return categorias.find((c) => c.slug === slug) ?? null;
}

// Devuelve solo los productos de una categoría (no modifica el arreglo original)
export function productosDeCategoria(productos, nombreCategoria) {
  return productos.filter((p) => p.categoria === nombreCategoria);
}
