export interface PharmacyPrice {
  farmacia: string;
  precio: number;
  distancia: string;
  stock: "Disponible" | "Últimas unidades" | "Agotado";
  logoColor: string;
}

export interface Medicine {
  id: string;
  nombre: string;
  presentacion: string;
  categoria: string;
  precios: PharmacyPrice[];
}

export const medicines: Medicine[] = [
  {
    id: "acetaminofen",
    nombre: "Acetaminofén 500mg",
    presentacion: "Caja x 20 tabletas",
    categoria: "Analgésicos",
    precios: [
      { farmacia: "Farmacia Fischel", precio: 1450, distancia: "1.2 km", stock: "Disponible", logoColor: "#0d9488" },
      { farmacia: "Farmacia Sucre", precio: 1290, distancia: "2.4 km", stock: "Disponible", logoColor: "#6366f1" },
      { farmacia: "La Bomba", precio: 1690, distancia: "0.8 km", stock: "Últimas unidades", logoColor: "#f59e0b" },
      { farmacia: "Farmacias Vitalis", precio: 1180, distancia: "3.1 km", stock: "Disponible", logoColor: "#ec4899" },
    ],
  },
  {
    id: "ibuprofeno",
    nombre: "Ibuprofeno 400mg",
    presentacion: "Caja x 10 tabletas",
    categoria: "Antiinflamatorios",
    precios: [
      { farmacia: "Farmacia Fischel", precio: 2100, distancia: "1.2 km", stock: "Disponible", logoColor: "#0d9488" },
      { farmacia: "Farmacia Sucre", precio: 1980, distancia: "2.4 km", stock: "Últimas unidades", logoColor: "#6366f1" },
      { farmacia: "La Bomba", precio: 2350, distancia: "0.8 km", stock: "Disponible", logoColor: "#f59e0b" },
      { farmacia: "Farmacias Vitalis", precio: 1890, distancia: "3.1 km", stock: "Disponible", logoColor: "#ec4899" },
    ],
  },
  {
    id: "omeprazol",
    nombre: "Omeprazol 20mg",
    presentacion: "Caja x 14 cápsulas",
    categoria: "Gastrointestinal",
    precios: [
      { farmacia: "Farmacia Fischel", precio: 3200, distancia: "1.2 km", stock: "Disponible", logoColor: "#0d9488" },
      { farmacia: "Farmacia Sucre", precio: 2890, distancia: "2.4 km", stock: "Disponible", logoColor: "#6366f1" },
      { farmacia: "La Bomba", precio: 3050, distancia: "0.8 km", stock: "Agotado", logoColor: "#f59e0b" },
      { farmacia: "Farmacias Vitalis", precio: 2750, distancia: "3.1 km", stock: "Disponible", logoColor: "#ec4899" },
    ],
  },
  {
    id: "loratadina",
    nombre: "Loratadina 10mg",
    presentacion: "Caja x 10 tabletas",
    categoria: "Antialérgicos",
    precios: [
      { farmacia: "Farmacia Fischel", precio: 1850, distancia: "1.2 km", stock: "Disponible", logoColor: "#0d9488" },
      { farmacia: "Farmacia Sucre", precio: 1690, distancia: "2.4 km", stock: "Disponible", logoColor: "#6366f1" },
      { farmacia: "La Bomba", precio: 1990, distancia: "0.8 km", stock: "Disponible", logoColor: "#f59e0b" },
      { farmacia: "Farmacias Vitalis", precio: 1590, distancia: "3.1 km", stock: "Últimas unidades", logoColor: "#ec4899" },
    ],
  },
  {
    id: "metformina",
    nombre: "Metformina 850mg",
    presentacion: "Caja x 30 tabletas",
    categoria: "Diabetes",
    precios: [
      { farmacia: "Farmacia Fischel", precio: 2450, distancia: "1.2 km", stock: "Disponible", logoColor: "#0d9488" },
      { farmacia: "Farmacia Sucre", precio: 2290, distancia: "2.4 km", stock: "Disponible", logoColor: "#6366f1" },
      { farmacia: "La Bomba", precio: 2600, distancia: "0.8 km", stock: "Disponible", logoColor: "#f59e0b" },
      { farmacia: "Farmacias Vitalis", precio: 2150, distancia: "3.1 km", stock: "Disponible", logoColor: "#ec4899" },
    ],
  },
  {
    id: "losartan",
    nombre: "Losartán 50mg",
    presentacion: "Caja x 30 tabletas",
    categoria: "Cardiovascular",
    precios: [
      { farmacia: "Farmacia Fischel", precio: 3450, distancia: "1.2 km", stock: "Disponible", logoColor: "#0d9488" },
      { farmacia: "Farmacia Sucre", precio: 3190, distancia: "2.4 km", stock: "Disponible", logoColor: "#6366f1" },
      { farmacia: "La Bomba", precio: 3650, distancia: "0.8 km", stock: "Últimas unidades", logoColor: "#f59e0b" },
      { farmacia: "Farmacias Vitalis", precio: 2990, distancia: "3.1 km", stock: "Disponible", logoColor: "#ec4899" },
    ],
  },
];

export const categorias = [
  "Todos",
  "Analgésicos",
  "Antiinflamatorios",
  "Gastrointestinal",
  "Antialérgicos",
  "Diabetes",
  "Cardiovascular",
];
