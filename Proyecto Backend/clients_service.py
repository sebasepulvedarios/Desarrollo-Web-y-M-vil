from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class NuevoCliente(BaseModel):
    nombre: str
    email: str
    password: str
    direccion: str

base_datos_clientes = [
    {"client_id": "CLI-001", "email": "ana@ejemplo.com", "nombre": "Ana", "direccion": "Las Condes 123"}
]

@app.post("/api/v1/clients", status_code=201)
def registrar_cliente(cliente: NuevoCliente):
    for c in base_datos_clientes:
        if c["email"] == cliente.email:
            raise HTTPException(status_code=409, detail="El email ya está registrado")
            
    nuevo_id = f"CLI-00{len(base_datos_clientes) + 1}"
    
    nuevo_perfil = {
        "client_id": nuevo_id,
        "nombre": cliente.nombre,
        "email": cliente.email,
        "direccion": cliente.direccion
    }
    
    base_datos_clientes.append(nuevo_perfil)
    return {"mensaje": "Cuenta creada exitosamente", "perfil": nuevo_perfil}