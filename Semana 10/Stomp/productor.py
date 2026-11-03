import argparse
import json

import stomp

DESTINO = "/queue/happy_kids_pedidos"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=61613)
    parser.add_argument("--usuario", default="demo")
    parser.add_argument("--clave", default="demo123")
    args = parser.parse_args()

    pedido_happy_kids = {
        "id_juguete": "PROD-101",
        "nombre": "Oso de Peluche Educativo",
        "cliente": "Ana Gomez",
        "cantidad": 2,
        "monto_total": "25980",
    }

    cuerpo = json.dumps(pedido_happy_kids, ensure_ascii=False)
    mime = "application/json; charset=utf-8"

    conexion = stomp.Connection12([(args.host, args.port)], vhost="/")
    try:
        conexion.connect(args.usuario, args.clave, wait=True)
        conexion.send(
            destination=DESTINO,
            body=cuerpo,
            headers={
                "content-type": mime,
                "persistent": "true",
            },
        )
        print(f"Pedido enviado exitosamente a {DESTINO}:\n{cuerpo}")
    finally:
        if conexion.is_connected():
            conexion.disconnect()


if __name__ == "__main__":
    main()
