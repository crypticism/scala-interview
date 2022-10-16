from typing import List

from pydantic import BaseModel


class Hiker(BaseModel):
    id: str
    speed: float


class Bridge(BaseModel):
    id: int
    length: int
    hikers: int
