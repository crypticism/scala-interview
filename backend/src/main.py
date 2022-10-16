from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schema import Hiker, Bridge

app = FastAPI()

hikers = [
    Hiker(id="A", speed=100),
    Hiker(id="B", speed=50),
    Hiker(id="C", speed=20),
    Hiker(id="D", speed=10),
    Hiker(id="E", speed=2.5),
    Hiker(id="F", speed=25),
    Hiker(id="G", speed=15),
]

bridges = [
    Bridge(id=0, length=100, hikers=4),
    Bridge(id=1, length=250, hikers=5),
    Bridge(id=2, length=150, hikers=7),
]


@app.get("/")
def root():
    return {"success": "success"}


@app.get("/hiker")
def list_hikers() -> List[Hiker]:
    return hikers


@app.get("/bridge")
def list_bridges() -> List[Bridge]:
    return bridges

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)