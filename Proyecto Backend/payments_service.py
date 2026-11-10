from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class SolicitudPago(BaseModel):
    order_id: str
    metodo_pago: str

base_datos_pagos = []

@app.post("/api/v1/payments", status_code=200)
def procesar_pago(pago: SolicitudPago):
    nuevo_pago_id = f"PAY-{len(base_datos_pagos) + 100}"
    
    registro_pago = {
        "payment_id": nuevo_pago_id,
        "order_id": pago.order_id,
        "metodo_pago": pago.metodo_pago,
        "status": "procesando"
    }
    
    base_datos_pagos.append(registro_pago)
    return registro_pago