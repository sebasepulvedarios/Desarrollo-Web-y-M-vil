from fastapi import FastAPI, Header, HTTPException

app = FastAPI()

base_datos_juguetes = [
    {"id": "PROD-101", "nombre": "Oso de Peluche Educativo", "emoji": "🧸", "precio": 12990, "desc": "Suave oso de peluche con texturas interactivas.", "stock": 15},
    {"id": "PROD-102", "nombre": "Rompecabezas de Madera", "emoji": "🧩", "precio": 8500, "desc": "Rompecabezas de 20 piezas con formas de animales.", "stock": 30}
]

@app.get("/api/v1/products")
def consultar_catalogo():
    productos_disponibles = [j for j in base_datos_juguetes if j["stock"] > 0]
    return {"productos": productos_disponibles}

@app.get("/internal/stock")
def verificar_stock_interno(producto_id: str, x_internal_token: str = Header(None)):
    if x_internal_token != "super-secreto-m2m-123":
        raise HTTPException(status_code=403, detail="Acceso interno denegado")
    
    for juguete in base_datos_juguetes:
        if juguete["id"] == producto_id:
            return {"producto_id": producto_id, "stock_disponible": juguete["stock"]}
            
    raise HTTPException(status_code=404, detail="Producto no encontrado en catálogo")