import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time

class MediCrawler:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        }
        self.results = []

    def scrape_vtex_store(self, store_name, base_url, search_term):
        """Estructura para tiendas como Fischel y La Bomba (VTEX)"""
        try:
            # Las tiendas VTEX tienen una API de búsqueda interna muy potente
            api_url = f"{base_url}/api/catalog_system/pub/products/search/{search_term}"
            response = requests.get(api_url, headers=self.headers, timeout=10)
            data = response.json()
            
            items = []
            for prod in data:
                # Extraemos el precio del primer SKU disponible
                seller = prod['items'][0]['sellers'][0]['commertialOffer']
                price = seller['Price']
                
                if price > 0:
                    items.append({
                        "pharmacy": store_name,
                        "price": price,
                        "link": prod['link'],
                        "stock": "Disponible" if seller['AvailableQuantity'] > 0 else "Agotado"
                    })
            return items
        except Exception as e:
            print(f"Error en {store_name}: {e}")
            return []

    def get_manual_data(self):
        """Datos de respaldo para productos críticos"""
        return [
            {
                "id": 100,
                "name": "Panadol Extra 500mg",
                "category": "Analgésicos",
                "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300",
                "meta": "Paracetamol + Cafeína",
                "prices": [
                    {"pharmacy": "FarmaValue", "price": 2850, "link": "https://farmavalue.com/cr", "stock": "Disponible"},
                    {"pharmacy": "Sucre", "price": 3100, "link": "https://sucreenlinea.com", "stock": "Disponible"}
                ]
            },
            {
                "id": 101,
                "name": "Ozempic 1mg",
                "category": "Diabetes",
                "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300",
                "meta": "Solución inyectable",
                "prices": [
                    {"pharmacy": "FarmaValue", "price": 62450, "link": "https://farmavalue.com/cr", "stock": "Oferta"},
                    {"pharmacy": "La Bomba", "price": 63000, "link": "https://farmacialabomba.com", "stock": "Disponible"}
                ]
            }
        ]

    def run(self):
        print("Iniciando rastreo masivo en Costa Rica...")
        
        # 1. Obtenemos base manual
        self.results = self.get_manual_data()
        
        # 2. Intentamos rastreo dinámico para productos específicos (Ejemplo: Panadol)
        # Esto buscará 'panadol' en las APIs de Fischel y La Bomba
        fischel_results = self.scrape_vtex_store("Fischel", "https://www.fischelenlinea.com", "panadol")
        labomba_results = self.scrape_vtex_store("La Bomba", "https://www.farmacialabomba.com", "panadol")
        
        # Unificamos los datos dinámicos en nuestro primer producto (ID 100)
        if fischel_results:
            self.results[0]["prices"].append(fischel_results[0])
        if labomba_results:
            self.results[0]["prices"].append(labomba_results[0])

        # 3. Guardamos el archivo final
        output = {
            "last_update": datetime.now().strftime("%d/%m/%Y %H:%M"),
            "total_products": len(self.results),
            "products": self.results
        }
        
        with open('productos.json', 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=4)
        
        print(f"Crawler finalizado. {len(self.results)} productos actualizados.")

if __name__ == "__main__":
    crawler = MediCrawler()
    crawler.run()
