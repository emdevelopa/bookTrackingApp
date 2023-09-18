"use client"; // A comment indicating this code is intended for the client-side

import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import { getBooks, addBook, moveBook, deleteBook } from './utils/api';
import { Book } from './models/book';

// The Home component represents the main page of the book management application.
export default function Home() {
  // State variables to store books in different categories (toRead, inProgress, completed)
  const [toRead, setToRead] = useState<Book[]>([]);
  const [inProgress, setInProgress] = useState<Book[]>([]);
  const [completed, setCompleted] = useState<Book[]>([]);
  
  // State variable to store the title of a new book to be added
  const [newBookTitle, setNewBookTitle] = useState('');

  // useEffect hook to fetch books from the backend API when the component mounts.
  useEffect(() => {
    getBooks().then((data) => {
      setToRead(data.toRead);
      setInProgress(data.inProgress);
      setCompleted(data.completed);
    });
  }, []);

  // Function to handle adding a new book to the backend and updating the state.
  const handleAddBook = async () => {
    if (newBookTitle) {
      try {
        // Add the new book and then fetch books again to update the state.
        await addBook(newBookTitle);
        const data = await getBooks();
        setToRead(data.toRead);
        setInProgress(data.inProgress);
        setCompleted(data.completed);
      } catch (error) {
        console.error('Error adding book:', error);
      }
    }
  };

  // Function to handle moving a book to a different category and updating the state.
  const handleMoveBook = async (bookId: number, destination: string) => {
    try {
      await moveBook(bookId, destination);

      // Move the book and then fetch books again to update the state.
      const data = await getBooks();
      setToRead(data.toRead);
      setInProgress(data.inProgress);
      setCompleted(data.completed);
    } catch (error) {
      console.error('Error moving book:', error);
    }
  };

  // Function to handle deleting a book from the backend and updating the state.
  const handleDeleteBook = async (bookId: number) => {
    try {
      await deleteBook(bookId);

      // Delete the book and then fetch books again to update the state.
      const data = await getBooks();
      setToRead(data.toRead);
      setInProgress(data.inProgress);
      setCompleted(data.completed);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Render the main content of the Home component.
  return (
    <div className="flex">
      {/* Section for 'To Read' books */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-semibold mb-2">To Read</h2>
        <div className="bg-white rounded-lg border p-4">
          <BookList books={toRead} onMove={handleMoveBook} onDelete={handleDeleteBook} />
        </div>
      </div>

      {/* Section for 'In Progress' books */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-semibold mb-2">In Progress</h2>
        <div className="bg-white rounded-lg border p-4">
          <BookList books={inProgress} onMove={handleMoveBook} onDelete={handleDeleteBook} />
        </div>
      </div>

      {/* Section for 'Completed' books */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-semibold mb-2">Completed</h2>
        <div className="bg-white rounded-lg border p-4">
          <BookList books={completed} onMove={handleMoveBook} onDelete={handleDeleteBook} />
        </div>
      </div>

      {/* Section for adding a new book */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-semibold mb-2">Add Book</h2>
        <div className="bg-white rounded-lg border p-4">
          <input
            type="text"
            placeholder="Enter book title"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            className="w-full border p-2 mb-2 rounded-lg"
          />
          <button
            onClick={handleAddBook}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}
