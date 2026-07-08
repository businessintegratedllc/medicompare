import json
from datetime import datetime

def generate_database():
    products = [
        {"id": 1, "name": "Panadol Extra 500mg", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [{"pharmacy": "Fischel", "price": 3250}, {"pharmacy": "FarmaValue", "price": 2850}, {"pharmacy": "La Bomba", "price": 2900}, {"pharmacy": "Sucre", "price": 3100}]},
        {"id": 2, "name": "Ozempic 1mg Pluma", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [{"pharmacy": "FarmaValue", "price": 62450}, {"pharmacy": "La Bomba", "price": 63000}]},
        {"id": 3, "name": "Acetaminofen Genfar", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [{"pharmacy": "Fischel", "price": 1200}, {"pharmacy": "La Bomba", "price": 900}, {"pharmacy": "Sucre", "price": 1100}]}
    ]
    
    data = {
        "last_update": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "products": products
    }
    
    with open('public/productos.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print("Base de datos generada exitosamente.")

if __name__ == "__main__":
    generate_database()
