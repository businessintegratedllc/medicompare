import json
from datetime import datetime

def generate_database():
    products = [
        {"id": 1, "name": "Panadol Extra 500mg", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 3250},
             {"pharmacy": "FarmaValue", "price": 2850},
             {"pharmacy": "La Bomba", "price": 2900},
             {"pharmacy": "Sucre", "price": 3150}
         ]},
        {"id": 2, "name": "Ozempic 1mg", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [
             {"pharmacy": "FarmaValue", "price": 62450},
             {"pharmacy": "La Bomba", "price": 63000}
         ]},
        {"id": 3, "name": "Algodon Hidrofilo", "image": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 1100},
             {"pharmacy": "La Bomba", "price": 950}
         ]}
    ]
    
    # El archivo JSON ahora solo guarda el nombre y el precio, 
    # los links se generan dinámicamente en el frontend para evitar 404s.
    data = {
        "last_update": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "products": products
    }
    
    with open('productos.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print("Base de datos optimizada generada.")

if __name__ == "__main__":
    generate_database()
