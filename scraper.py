import json
import requests
from datetime import datetime

# En un escenario real, aquí usaríamos BeautifulSoup o Selenium para navegar las webs
# que proporcionaste. Este script genera el archivo central que alimenta la web.

def generate_live_database():
    products = [
        {
            "id": 1,
            "name": "Panadol Extra 500mg",
            "meta": "Caja 16 tabletas · Paracetamol + Cafeína",
            "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300",
            "category": "Analgésicos",
            "prices": [
                {"pharmacy": "Fischel", "price": 3250, "link": "https://fischelenlinea.com/search?q=panadol", "stock": "Disponible"},
                {"pharmacy": "FarmaValue", "price": 2850, "link": "https://farmavalue.com/cr/", "stock": "Disponible"},
                {"pharmacy": "La Bomba", "price": 2900, "link": "https://farmacialabomba.com/", "stock": "Oferta"},
                {"pharmacy": "Sucre", "price": 3150, "link": "https://sucreenlinea.com/", "stock": "Disponible"}
            ]
        },
        {
            "id": 2,
            "name": "Ozempic 1mg",
            "meta": "Solución inyectable · Control Glucémico",
            "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300",
            "category": "Diabetes",
            "prices": [
                {"pharmacy": "Fischel", "price": 72000, "link": "https://fischelenlinea.com", "stock": "Disponible"},
                {"pharmacy": "FarmaValue", "price": 62450, "link": "https://farmavalue.com/cr", "stock": "Oferta"},
                {"pharmacy": "La Bomba", "price": 63000, "link": "https://farmacialabomba.com", "stock": "Disponible"},
                {"pharmacy": "Sucre", "price": 69500, "link": "https://sucreenlinea.com", "stock": "Disponible"}
            ]
        },
        # Aquí se añadirían automáticamente miles de productos más mediante el proceso de scraping
    ]
    
    data = {
        "last_update": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "total_products": len(products),
        "products": products
    }
    
    with open('productos.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    print(f"Base de datos actualizada con {len(products)} productos.")

if __name__ == "__main__":
    generate_live_database()
