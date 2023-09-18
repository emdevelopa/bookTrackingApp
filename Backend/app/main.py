from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models.book import Book
from repositories.book_repository import BookRepository
import mysql.connector

# Create a FastAPI application instance
app = FastAPI()

# Define the MySQL database configuration
mysql_config = {
    'user': 'root',
    'password': 'Never$give$up999',
    'host': 'localhost',  # Typically 'localhost' for local development
    'database': 'BookApp',
    'raise_on_warnings': True,
}

try:
    # Establish a MySQL database connection
    db_connection = mysql.connector.connect(**mysql_config)
    print("Database connection established successfully.")
except mysql.connector.Error as err:
    print(f"Error: {err}")
    raise SystemExit

# Create a BookRepository instance to interact with the database
book_repository = BookRepository(db_connection)

# Define the allowed origins for CORS
origins = [
    "http://localhost:3000",  # Add the origins that should be allowed to access your API
]

# Configure CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can restrict this to specific HTTP methods (e.g., ["GET", "POST"])
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
