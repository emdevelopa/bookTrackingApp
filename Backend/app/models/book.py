from dataclasses import dataclass
from pydantic import BaseModel

# The Book class represents a book object with attributes 'id', 'title', and 'state'.
@dataclass
class Book:
    # 'id' is an integer representing the unique identifier of the book.
    id: int
    
    # 'title' is a string representing the title of the book.
    title: str
    
    # 'state' is a string representing the current state or status of the book.
    state: str
