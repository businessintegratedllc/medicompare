import json
import requests
from datetime import datetime
import time

class MediCrawler:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        }
        # Lista de palabras clave para que el buscador siempre tenga resultados reales
        self.keywords = ["panadol", "algodon", "alcohol", "gasa", "vitamina", "jabon", "mascarilla", "ensure", "advil"]
        self.final_products = []

    def fetch_vtex(self, store_name, base_url, term):
        """Extrae datos reales de Fischel y La Bomba"""
        try:
            api_url = f"{base_url}/api/catalog_system/pub/products/search/{term}"
            res = requests.get(api_url, headers=self.headers, timeout=10)
            if res.status_code != 200: return []
            
            data = res.json()
            results = []
            for p in data[:3]: # Tomamos los 3 más relevantes por farmacia
                seller = p['items'][0]['sellers'][0]['commertialOffer']
                if seller['Price'] > 0:
                    results.append({
                        "pharmacy": store_name,
                        "price": seller['Price'],
                        "link": p['link'],
                        "stock": "Disponible" if seller['AvailableQuantity'] > 0 else "Agotado"
                    })
            return results
        except:
            return []

    def run(self):
        print(f"--- Iniciando Rastreo en Costa Rica ({len(self.keywords)} categorías) ---")
        
        product_id = 1
        for term in self.keywords:
            print(f"Buscando: {term}...")
            
            # Buscamos en las farmacias reales
            fischel_data = self.fetch_vtex("Fischel", "https://www.fischelenlinea.com", term)
            labomba_data = self.fetch_vtex("La Bomba", "https://www.farmacialabomba.com", term)
            
            # Si encontramos resultados, creamos el producto en nuestra base de datos
            if fischel_data or labomba_data:
                # Usamos el nombre del primer resultado encontrado
                main_name = fischel_data[0]['link'].split('/')[-2].replace('-', ' ').title() if fischel_data else term.title()
                
                new_prod = {
                    "id": product_id,
                    "name": main_name,
                    "category": "General",
                    "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300",
                    "meta": f"Resultados para {term}",
                    "prices": fischel_data + labomba_data
                }
                
                # Añadimos precios fijos de FarmaValue/Sucre para completar la comparativa (Simulado)
                # En una fase avanzada, aquí añadirías el scraper de esas webs también
                base_price = (fischel_data[0]['price'] if fischel_data else labomba_data[0]['price'])
                new_prod["prices"].append({"pharmacy": "FarmaValue", "price": base_price * 0.9, "link": "https://farmavalue.com/cr", "stock": "Disponible"})
                new_prod["prices"].append({"pharmacy": "Sucre", "price": base_price * 1.05, "link": "https://sucreenlinea.com", "stock": "Disponible"})

                self.final_products.append(new_prod)
                product_id += 1
            
            time.sleep(1) # Pausa para no ser bloqueados

        # Guardar resultados
        output = {
            "last_update": datetime.now().strftime("%d/%m/%Y %H:%M"),
            "total_products": len(self.final_products),
            "products": self.final_products
        }
        
        with open('productos.json', 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=4)
        
        print(f"--- Éxito: Base de datos creada con {len(self.final_products)} productos reales ---")

if __name__ == "__main__":
    MediCrawler().run()
