FROM python:3.10-slim
WORKDIR /app
RUN pip install --no-cache-dir fastapi uvicorn requests strawberry-graphql stomp.py pydantic
COPY . .