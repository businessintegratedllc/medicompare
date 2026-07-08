import json
from datetime import datetime

def generate_database():
    # Base de datos profesional expandida
    products = [
        {"id": 1, "name": "Panadol Extra 500mg", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 3250, "link": "https://www.fischelenlinea.com/search?q=panadol%20extra"},
             {"pharmacy": "FarmaValue", "price": 2850, "link": "https://www.farmavalue.com/cr/catalogsearch/result/?q=panadol%20extra"},
             {"pharmacy": "La Bomba", "price": 2900, "link": "https://www.farmacialabomba.com/panadol-extra?_q=panadol-extra&map=ft"},
             {"pharmacy": "Sucre", "price": 3150, "link": "https://sucreenlinea.com/catalogsearch/result/?q=panadol%20extra"}
         ]},
        {"id": 2, "name": "Ozempic 1mg", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [
             {"pharmacy": "FarmaValue", "price": 62450, "link": "https://www.farmavalue.com/cr/catalogsearch/result/?q=ozempic"},
             {"pharmacy": "La Bomba", "price": 63000, "link": "https://www.farmacialabomba.com/ozempic?_q=ozempic&map=ft"}
         ]},
        {"id": 3, "name": "Algodón Hidrófilo 100g", "image": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 1200, "link": "https://www.fischelenlinea.com/search?q=algodon"},
             {"pharmacy": "La Bomba", "price": 900, "link": "https://www.farmacialabomba.com/algodon?_q=algodon&map=ft"}
         ]}
    ]
    
    data = {
        "last_update": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "products": products
    }
    
    with open('productos.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print("Base de datos MediCompare actualizada sin errores.")

if __name__ == "__main__":
    generate_database()
