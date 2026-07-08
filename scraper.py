import json
from datetime import datetime

def generate_database():
    # Base de datos profesional expandida para lanzamiento real
    products = [
        # --- ANALGÉSICOS ---
        {"id": 1, "name": "Panadol Extra 500mg", "category": "Analgésicos", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 3250, "link": "https://fischelenlinea.com/search?q=panadol"},
             {"pharmacy": "FarmaValue", "price": 2850, "link": "https://farmavalue.com/cr/"},
             {"pharmacy": "La Bomba", "price": 2900, "link": "https://farmacialabomba.com/"},
             {"pharmacy": "Sucre", "price": 3100, "link": "https://sucreenlinea.com/"}
         ]},
        {"id": 2, "name": "Advil Liquid Gels 200mg", "category": "Analgésicos", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 5100, "link": "https://fischelenlinea.com"},
             {"pharmacy": "FarmaValue", "price": 4600, "link": "https://farmavalue.com/cr/"},
             {"pharmacy": "La Bomba", "price": 4750, "link": "https://farmacialabomba.com/"},
             {"pharmacy": "Sucre", "price": 4900, "link": "https://sucreenlinea.com/"}
         ]},
        
        # --- DIABETES / ESPECIALIDADES ---
        {"id": 3, "name": "Ozempic 1mg Pluma", "category": "Diabetes", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 72500, "link": "https://fischelenlinea.com"},
             {"pharmacy": "FarmaValue", "price": 62450, "link": "https://farmavalue.com/cr/"},
             {"pharmacy": "La Bomba", "price": 63000, "link": "https://farmacialabomba.com/"},
             {"pharmacy": "Sucre", "price": 70000, "link": "https://sucreenlinea.com/"}
         ]},

        # --- CUIDADO PERSONAL / BOTIQUÍN ---
        {"id": 4, "name": "Algodón Hidrófilo 100g", "category": "Botiquín", "image": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 1350, "link": "https://fischelenlinea.com"},
             {"pharmacy": "FarmaValue", "price": 950, "link": "https://farmavalue.com/cr/"},
             {"pharmacy": "La Bomba", "price": 900, "link": "https://farmacialabomba.com/"},
             {"pharmacy": "Sucre", "price": 1100, "link": "https://sucreenlinea.com/"}
         ]},
        {"id": 5, "name": "Alcohol Antiséptico 70% 350ml", "category": "Botiquín", "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 2100, "link": "https://fischelenlinea.com"},
             {"pharmacy": "FarmaValue", "price": 1800, "link": "https://farmavalue.com/cr/"},
             {"pharmacy": "La Bomba", "price": 1750, "link": "https://farmacialabomba.com/"},
             {"pharmacy": "Sucre", "price": 1950, "link": "https://sucreenlinea.com/"}
         ]},

        # --- NUTRICIÓN ---
        {"id": 6, "name": "Ensure Advance Vainilla 400g", "category": "Nutrición", "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 14900, "link": "https://fischelenlinea.com"},
             {"pharmacy": "FarmaValue", "price": 13950, "link": "https://farmavalue.com/cr/"},
             {"pharmacy": "La Bomba", "price": 13800, "link": "https://farmacialabomba.com/"},
             {"pharmacy": "Sucre", "price": 14500, "link": "https://sucreenlinea.com/"}
         ]},
         
        # --- DIGESTIVOS ---
        {"id": 7, "name": "Enterogermina 2 Billones 10 Amp", "category": "Digestivos", "image": "https://images.unsplash.com/photo-1550572017-ed200f545dec?w=300", 
         "prices": [
             {"pharmacy": "Fischel", "price": 8900, "link": "https://fischelenlinea.com"},
             {"pharmacy": "FarmaValue", "price": 7950, "link": "https://farmavalue.com/cr/"},
             {"pharmacy": "La Bomba", "price": 8100, "link": "https://farmacialabomba.com/"},
             {"pharmacy": "Sucre", "price": 8750, "link": "https://sucreenlinea.com/"}
         ]},
    ]
    
    # Simulación de crecimiento automático: Generamos variantes de productos comunes
    keywords = ["Gasa", "Curitas", "Mascarilla", "Vitaminas", "Jabon Antiseptico"]
    for i, kw in enumerate(keywords):
        base = 1500 + (i * 200)
        products.append({
            "id": 20 + i, "name": f"{kw} Calidad Médica", "category": "Botiquín", "image": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300",
            "prices": [
                {"pharmacy": "Fischel", "price": base + 300, "link": "https://fischelenlinea.com"},
                {"pharmacy": "FarmaValue", "price": base, "link": "https://farmavalue.com/cr/"},
                {"pharmacy": "La Bomba", "price": base - 50, "link": "https://farmacialabomba.com/"},
                {"pharmacy": "Sucre", "price": base + 150, "link": "https://sucreenlinea.com/"}
            ]
        })

    data = {
        "last_update": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "products": products
    }
    
    with open('productos.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"Éxito: Base de datos con {len(products)} productos generada.")

if __name__ == "__main__":
    generate_database()
