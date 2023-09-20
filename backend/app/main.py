import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models.book import Book
from repositories.book_repository import BookRepository

import sqlite3

# Create a FastAPI application instance
app = FastAPI()

# db_connection = None
# cursor = None

db_connection = sqlite3.connect('database.db')
cursor = db_connection.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        state TEXT NOT NULL
    )
''')

# Check if the database connection and cursor are valid
if db_connection is not None and cursor is not None:
    print("Connected to the database")

    # Create a BookRepository instance to interact with the database
    book_repository = BookRepository(db_connection)

else:
    print('Failed to connect to the database')

# book_repository = BookRepository(db_connection)



# Define the allowed origins for CORS
origins = [
    "http://localhost:3000",  # Add the origins that should be allowed to access your API
]

# Configure CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can rcursor.execute("SELECT id, title, state FROM books")estrict this to specific HTTP methods (e.g., ["GET", "POST"])
    allow_headers=["*"],  # You can restrict this to specific HTTP headers if needed
)

# Define a root route that returns a JSON response
@app.get("/")
def read_root():
    return JSONResponse(content={"Hello": "World"})

# Define a route to retrieve all books from the database
@app.get("/books")
async def get_books():
    books = book_repository.get_all_books()
    to_read = [book for book in books if book.state == 'to-read']
    in_progress = [book for book in books if book.state == 'inProgress']
    completed = [book for book in books if book.state == 'completed']
    return {"toRead": to_read, "inProgress": in_progress, "completed": completed}

# Define a route to create a new book in the database
@app.post("/books", response_model=Book)
async def create_book(title: dict, request: Request): 
    data = await request.json()  # Parse the JSON data from the request body
    new_book = book_repository.add_book(data['title'])
    return new_book

# Define a route to update the state of a book in the database
@app.put("/books/{book_id}/move")
async def update_book(book_id: int, request: Request):
    data = await request.json()
    new_state = data['destination']
    move_book = book_repository.move_book(book_id, new_state)
    return move_book

# Define a route to delete a book from the database
@app.delete("/books/{book_id}", response_model=None)
async def delete_book(book_id: int):
    book_repository.delete_book(book_id)
    return None

# Run the FastAPI application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
