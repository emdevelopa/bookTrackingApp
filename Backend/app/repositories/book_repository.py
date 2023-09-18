import mysql.connector
from models.book import Book

# The BookRepository class provides methods to interact with a MySQL database for managing books.
class BookRepository:
    # Constructor for initializing the BookRepository with a database connection.
    def __init__(self, db_connection):
        self.connection = db_connection

    # Method to retrieve all books from the database.
    def get_all_books(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT id, title, state FROM books")
        
        # Fetch all book records from the database and create Book objects.
        books = [Book(id, title, state) for (id, title, state) in cursor.fetchall()]
        return books

    # Method to add a new book to the database.
    def add_book(self, title):
        cursor = self.connection.cursor()
        
        # Insert a new book record into the 'books' table with an initial state of 'to-read'.
        cursor.execute("INSERT INTO books (title, state) VALUES (%s, %s)", (title, 'to-read'))
        self.connection.commit()
        
        # Retrieve the ID of the newly inserted book and create a Book object.
        book_id = cursor.lastrowid
        return Book(book_id, title, 'to-read')

    # Method to move a book to a different state in the database.
    def move_book(self, book_id, new_state):
        cursor = self.connection.cursor()
        
        # Update the 'state' of a book based on its ID in the 'books' table.
        cursor.execute("UPDATE books SET state = %s WHERE id = %s", (new_state, book_id))
        self.connection.commit()

    # Method to delete a book from the database.
    def delete_book(self, book_id):
        cursor = self.connection.cursor()
        
        # Delete a book from the 'books' table based on its ID.
        cursor.execute("DELETE FROM books WHERE id = %s", (book_id,))
        self.connection.commit()
