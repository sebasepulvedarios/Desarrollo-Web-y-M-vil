import argparse
import json
import time

import stomp

DESTINO = "/queue/happy_kids_pedidos"


class EscuchadorHappyKids(stomp.ConnectionListener):
    def __init__(self, conexion):
        self.conexion = conexion

    def on_error(self, frame):
        print(f"ERROR: {frame.body}")

    def on_disconnected(self):
        print("Conexión con el broker cerrada.")

    def on_message(self, frame):
        ack_id = frame.headers["ack"]
        try:
            datos = json.loads(frame.body)
            print("\n[HAPPY KIDS - NUEVO PEDIDO PROCESADO]")
            print(json.dumps(datos, ensure_ascii=False, indent=2))
            self.conexion.ack(id=ack_id)
        except Exception as exc:
            print(f"Error procesando mensaje: {exc}")
            self.conexion.nack(id=ack_id, requeue="false")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=61613)
    parser.add_argument("--usuario", default="demo")
    parser.add_argument("--clave", default="demo123")
    args = parser.parse_args()

    conexion = stomp.Connection12([(args.host, args.port)], vhost="/")
    conexion.set_listener("happy_kids_listener", EscuchadorHappyKids(conexion))

    try:
        conexion.connect(args.usuario, args.clave, wait=True)
        conexion.subscribe(
            destination=DESTINO,
            id="lector-happy-kids",
            ack="client-individual",
            headers={"prefetch-count": "1"},
        )
        print(
            f"Escuchando cola {DESTINO} para Happy Kids... Presiona Ctrl+C para salir."
        )
        while conexion.is_connected():
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\nDeteniendo consumidor...")
    finally:
        if conexion.is_connected():
            conexion.disconnect()


if __name__ == "__main__":
    main()
