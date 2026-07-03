import json
from datetime import datetime

def generate_live_database():
    # Esta es tu base de datos centralizada. 
    # Aquí puedes seguir agregando todos los productos que desees.
    products = [
        {
            "id": 1,
            "name": "Panadol Extra 500mg",
            "meta": "Caja 16 tabletas · Paracetamol + Cafeína",
            "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300",
            "category": "Analgésicos",
            "prices": [
                {"pharmacy": "Fischel", "price": 3250, "link": "https://fischelenlinea.com", "stock": "Disponible"},
                {"pharmacy": "FarmaValue", "price": 2850, "link": "https://farmavalue.com/cr", "stock": "Disponible"},
                {"pharmacy": "La Bomba", "price": 2900, "link": "https://farmacialabomba.com", "stock": "En Oferta"},
                {"pharmacy": "Sucre", "price": 3150, "link": "https://sucreenlinea.com", "stock": "Disponible"}
            ]
        },
        {
            "id": 2,
            "name": "Ozempic 1mg",
            "meta": "Solución inyectable · Control Glucémico (Diabetes)",
            "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300",
            "category": "Diabetes",
            "prices: [
                {"pharmacy": "Fischel", "price": 72000, "link": "https://fischelenlinea.com", "stock": "Disponible"},
                {"pharmacy": "FarmaValue", "price": 62450, "link": "https://farmavalue.com/cr", "stock": "Mejor Precio"},
                {"pharmacy": "La Bomba", "price": 63000, "link": "https://farmacialabomba.com", "stock": "Disponible"},
                {"pharmacy": "Sucre", "price": 69500, "link": "https://sucreenlinea.com", "stock": "Disponible"}
            ]
        },
        {
            "id": 3,
            "name": "Ensure Advance Vainilla",
            "meta": "Lata 400g · Suplemento Nutricional Adulto",
            "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300",
            "category": "Nutrición",
            "prices": [
                {"pharmacy": "Fischel", "price": 14500, "link": "https://fischelenlinea.com", "stock": "Oferta Web"},
                {"pharmacy": "FarmaValue", "price": 13950, "link": "https://farmavalue.com/cr", "stock": "Disponible"},
                {"pharmacy": "La Bomba", "price": 13800, "link": "https://farmacialabomba.com", "stock": "Disponible"},
                {"pharmacy": "Sucre", "price": 14200, "link": "https://sucreenlinea.com", "stock": "Disponible"}
            ]
        },
        {
            "id": 4,
            "name": "Enterogermina 2 Billones",
            "meta": "Caja 10 ampolletas bebíbles · Probióticos",
            "image": "https://images.unsplash.com/photo-1550572017-ed200f545dec?w=300",
            "category": "Estómago",
            "prices": [
                {"pharmacy": "Fischel", "price": 8900, "link": "https://fischelenlinea.com", "stock": "Disponible"},
                {"pharmacy": "FarmaValue", "price": 7950, "link": "https://farmavalue.com/cr", "stock": "Disponible"},
                {"pharmacy": "La Bomba", "price": 8100, "link": "https://farmacialabomba.com", "stock": "Disponible"},
                {"pharmacy": "Sucre", "price": 8750, "link": "https://sucreenlinea.com", "stock": "Disponible"}
            ]
        },
        {
            "id": 5,
            "name": "Advil 400mg Líquido",
            "meta": "Caja 20 cápsulas líquidas · Ibuprofeno",
            "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=300",
            "category": "Analgésicos",
            "prices": [
                {"pharmacy": "Fischel", "price": 5200, "link": "https://fischelenlinea.com", "stock": "Disponible"},
                {"pharmacy": "FarmaValue", "price": 4650, "link": "https://farmavalue.com/cr", "stock": "En Oferta"},
                {"pharmacy": "La Bomba", "price": 4700, "link": "https://farmacialabomba.com", "stock": "Disponible"},
                {"pharmacy": "Sucre", "price": 4950, "link": "https://sucreenlinea.com", "stock": "Disponible"}
            ]
        },
        {
            "id": 6,
            "name": "Alka-Seltzer Boost",
            "meta": "Sobre 2 tabletas · Alivio Digestivo",
            "image": "https://images.unsplash.com/photo-1550572017-ed200f545dec?w=300",
            "category": "Estómago",
            "prices": [
                {"pharmacy": "Fischel", "price": 850, "link": "https://fischelenlinea.com", "stock": "Disponible"},
                {"pharmacy": "FarmaValue", "price": 650, "link": "https://farmavalue.com/cr", "stock": "Disponible"},
                {"pharmacy": "La Bomba", "price": 600, "link: "https://farmacialabomba.com", "stock": "Disponible"},
                {"pharmacy": "Sucre", "price": 750, "link": "https://sucreenlinea.com", "stock": "Disponible"}
            ]
        },
        {
            "id": 7,
            "name": "Loratadina 10mg",
            "meta": "Caja 30 tabletas · Antialérgico",
            "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=300",
            "category": "Alergias",
            "prices": [
                {"pharmacy": "Fischel", "price": 2500, "link": "https://fischelenlinea.com", "stock": "Disponible"},
                {"pharmacy": "FarmaValue", "price": 1950, "link": "https://farmavalue.com/cr", "stock": "Mejor Precio"},
                {"pharmacy": "La Bomba", "price": 2000, "link": "https://farmacialabomba.com", "stock": "Disponible"},
                {"pharmacy": "Sucre", "price": 2300, "link": "https://sucreenlinea.com", "stock": "Disponible"}
            ]
        }
    ]
    
    data = {
        "last_update": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "total_products": len(products),
        "products": products
    }
    
    with open('productos.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    print(f"Éxito: Se han procesado {len(products)} productos.")

if __name__ == "__main__":
    generate_live_database()
