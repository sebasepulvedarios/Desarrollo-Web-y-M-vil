import os

import requests
import strawberry
from fastapi import FastAPI, HTTPException
from strawberry.fastapi import GraphQLRouter

ORDERS_URL = os.getenv("ORDERS_URL", "http://orders-service:8002/api/v1/orders")
INVENTORY_URL = os.getenv(
    "INVENTORY_URL", "http://inventory-service:9001/internal/stock"
)
INVENTORY_TOKEN = os.getenv("INVENTORY_TOKEN", "super-secreto-m2m-123")


@strawberry.type
class ProductoDetalle:
    id: str
    nombre: str
    precio: int
    emoji: str


@strawberry.type
class ItemCarritoResumen:
    producto_id: str
    cantidad: int
    info_producto: ProductoDetalle


@strawberry.type
class PedidoResumen:
    order_id: str
    estado: str
    total: int
    items: list[ItemCarritoResumen]


@strawberry.type
class Query:
    @strawberry.field
    def resumen_pedido(self, order_id: str) -> PedidoResumen:
        resp_order = requests.get(f"{ORDERS_URL}/{order_id}")
        if resp_order.status_code != 200:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")

        pedido = resp_order.json()
        items_agregados = []

        headers = {"x-internal-token": INVENTORY_TOKEN}
        for item in pedido.get("items", []):
            prod_id = item["producto_id"]
            resp_stock = requests.get(
                f"{INVENTORY_URL}?producto_id={prod_id}", headers=headers
            )
            prod_info = resp_stock.json() if resp_stock.status_code == 200 else {}

            items_agregados.append(
                ItemCarritoResumen(
                    producto_id=prod_id,
                    cantidad=item["cantidad"],
                    info_producto=ProductoDetalle(
                        id=prod_id,
                        nombre=prod_info.get("nombre", "Juguete Happy Kids"),
                        precio=prod_info.get("precio", 12990),
                        emoji=prod_info.get("emoji", "🧸"),
                    ),
                )
            )

        return PedidoResumen(
            order_id=pedido["order_id"],
            estado=pedido["estado"],
            total=pedido["total"],
            items=items_agregados,
        )


schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema)

app = FastAPI(title="Happy Kids - GraphQL Gateway")
app.include_router(graphql_app, prefix="/graphql")
