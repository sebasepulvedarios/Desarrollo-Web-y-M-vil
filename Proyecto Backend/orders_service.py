import os

import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


class ItemCarrito(BaseModel):
    producto_id: str
    cantidad: int


class Pedido(BaseModel):
    items: list[ItemCarrito]


base_datos_pedidos = []


@app.get("/api/v1/orders/{order_id}")
def obtener_pedido(order_id: str):
    for orden in base_datos_pedidos:
        if orden["order_id"] == order_id:
            return orden
    raise HTTPException(status_code=404, detail="Pedido no encontrado")


INVENTORY_TOKEN = os.getenv("INVENTORY_TOKEN", "super-secreto-m2m-123")
INVENTORY_URL = os.getenv(
    "INVENTORY_URL", "http://inventory-service:9001/internal/stock"
)


@app.post("/api/v1/orders", status_code=201)
def crear_pedido(pedido: Pedido):
    for item in pedido.items:
        cabeceras = {"x-internal-token": INVENTORY_TOKEN}
        respuesta = requests.get(
            f"{INVENTORY_URL}?producto_id={item.producto_id}", headers=cabeceras
        )

        if respuesta.status_code == 403:
            raise HTTPException(
                status_code=500,
                detail="Error de configuración de seguridad interna (Vault)",
            )
        if respuesta.status_code != 200:
            raise HTTPException(
                status_code=409,
                detail=f"No se pudo verificar el producto {item.producto_id}",
            )

        datos_stock = respuesta.json()

        if datos_stock["stock_disponible"] < item.cantidad:
            raise HTTPException(
                status_code=400, detail=f"Sin stock suficiente para {item.producto_id}"
            )

    nuevo_id = f"ORD-{len(base_datos_pedidos) + 1000}"

    orden_guardada = {
        "order_id": nuevo_id,
        "items": [item.dict() for item in pedido.items],
        "total": 24990,
        "estado": "pendiente_pago",
    }

    base_datos_pedidos.append(orden_guardada)
    return orden_guardada
