import os
import secrets

from fastapi import Depends, FastAPI, Header, HTTPException

app = FastAPI(
    title="Protected Backend API español",
    description="API ubicada en el localhost enruta por API gateway /api/productos y /api/ordenes",
)

# SELINUX
INTERNAL_GATEWAY_SECRET = os.getenv("INTERNAL_GATEWAY_SECRET")

if not INTERNAL_GATEWAY_SECRET:
    raise RuntimeError("INTERNAL_GATEWAY_SECRET no está configurado")


def verify_gateway(x_gateway_secret: str = Header(default="")):
    valid = secrets.compare_digest(x_gateway_secret, INTERNAL_GATEWAY_SECRET)
    if not valid:
        raise HTTPException(
            status_code=403, detail="Solicitud no autorizada desde gateway"
        )


@app.get("/health", dependencies=[Depends(verify_gateway)])
def health(
    x_authenticated_client: str | None = Header(default=None),
    x_authenticated_user: str | None = Header(default=None),
    x_authenticated_roles: str | None = Header(default=None),
):
    return {
        "identity": {
            "client_id": x_authenticated_client,
            "username": x_authenticated_user,
            "roles": x_authenticated_roles,
        },
        "status": "OK",
        "service": "Backend API 2",
    }


@app.get("/productos", dependencies=[Depends(verify_gateway)])
def productos(
    x_authenticated_client: str | None = Header(default=None),
    x_authenticated_user: str | None = Header(default=None),
    x_authenticated_roles: str | None = Header(default=None),
):
    return {
        "identity": {
            "client_id": x_authenticated_client,
            "username": x_authenticated_user,
            "roles": x_authenticated_roles,
        },
        "productos": [
            {"id": 1, "nombre": "Notebook", "precio": 900000},
            {"id": 2, "nombre": "Monitor", "precio": 250000},
        ],
    }


@app.get("/ordenes", dependencies=[Depends(verify_gateway)])
def ordenes(
    x_authenticated_client: str | None = Header(default=None),
    x_authenticated_user: str | None = Header(default=None),
    x_authenticated_roles: str | None = Header(default=None),
):
    return {
        "identity": {
            "client_id": x_authenticated_client,
            "username": x_authenticated_user,
            "roles": x_authenticated_roles,
        },
        "ordenes": [
            {"id": 1001, "estado": "pagado"},
            {"id": 1002, "estado": "pendiente"},
        ],
    }
