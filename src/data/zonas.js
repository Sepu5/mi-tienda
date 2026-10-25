// Regiones de Chile y sus comunas (el select de comuna depende de la región elegida).
// La Región Metropolitana está completa; en las demás hay las comunas principales.
export const zonas = [
  { id: "arica", nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
  { id: "tarapaca", nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"] },
  { id: "antofagasta", nombre: "Antofagasta", comunas: ["Antofagasta", "Calama", "Mejillones", "Tocopilla", "San Pedro de Atacama"] },
  { id: "atacama", nombre: "Atacama", comunas: ["Copiapó", "Vallenar", "Caldera", "Chañaral"] },
  { id: "coquimbo", nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"] },
  { id: "valparaiso", nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Quillota", "Los Andes", "San Felipe"] },
  {
    id: "metropolitana",
    nombre: "Región Metropolitana de Santiago",
    comunas: [
      "Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví",
      "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo",
      "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes",
      "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa",
      "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia",
      "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo",
      "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante",
      "Tiltil", "Vitacura",
    ],
  },
  { id: "ohiggins", nombre: "Libertador General Bernardo O'Higgins", comunas: ["Rancagua", "Machalí", "San Fernando", "Rengo", "Santa Cruz", "Pichilemu"] },
  { id: "maule", nombre: "Maule", comunas: ["Talca", "Curicó", "Linares", "Cauquenes", "Constitución"] },
  { id: "nuble", nombre: "Ñuble", comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quirihue"] },
  { id: "biobio", nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Los Ángeles", "Coronel", "Lota"] },
  { id: "araucania", nombre: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Lautaro"] },
  { id: "losrios", nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"] },
  { id: "loslagos", nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Puerto Varas", "Castro", "Ancud", "Calbuco"] },
  { id: "aysen", nombre: "Aysén", comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico"] },
  { id: "magallanes", nombre: "Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir"] },
];