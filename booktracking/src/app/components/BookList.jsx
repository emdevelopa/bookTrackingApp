import React, { useState } from 'react';
import { FaPlus, FaUser } from 'react-icons/fa';

// BookList is a functional React component that displays a list of books.
// It accepts three props: books (an array of book objects), onMove (a function to handle moving a book),
// onDelete (a function to handle deleting a book), and onUpdateTitle (a function to handle updating a book's title).
const BookList = ({ books, onMove, onDelete, onUpdateTitle }) => {
  // Create a state variable to track the editing state of each book.
  const [editMode, setEditMode] = useState({});

  // Function to toggle the editing state for a book.
  const toggleEditMode = (bookId) => {
    setEditMode((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId] || false,
    }));
  };

  // Function to handle updating the book title.
  const handleUpdateTitle = (bookId, newTitle) => {
    toggleEditMode(bookId); // Disable editing mode after updating.
    onUpdateTitle(bookId, newTitle);
  };

  return (
    // Render an unordered list with a flexbox layout and a gap of 4 units between children.
    <ul className='flex flex-col gap-4'>
      {/* Map over the array of books and render each book as a list item. */}
      {books.map((book, index) => (
        <li key={book.id} className='flex flex-col gap-2'>
          {/* Display the title of the book, editable if in edit mode. */}
          {editMode[book.id] ? (
            <div className='flex gap-2'>
              <input
                type='text'
                value={book.title}
                onChange={(e) => onUpdateTitle(book.id, e.target.value)}
                className='flex-grow border rounded p-2'
              />
              <button
                onClick={() => handleUpdateTitle(book.id, book.title)}
                className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-md'
              >
                Save
              </button>
            </div>
          ) : (
            <div className='flex gap-2 items-center justify-between'>
              <h1 className='font-bold text-[28px]'>{book.title}</h1>
              <button
                onClick={() => toggleEditMode(book.id)}
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-2 rounded-md'
              >
                Edit
              </button>
            </div>
          )}

          {/* Button to move the book to the 'inProgress' category when clicked. */}
          <button
            key={`move-${book.id}-${index}`}
            onClick={() => onMove(book.id, 'inProgress')}
            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-md'
          >
            In progress
          </button>

          {/* Button to move the book to the 'completed' category when clicked. */}
          <button
            key={`complete-${book.id}-${index}`}
            onClick={() => onMove(book.id, 'completed')}
            className='bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md'
          >
            Completed
          </button>

          {/* Button to delete the book when clicked. */}
          <button
            key={`delete-${book.id}-${index}`}
            onClick={() => onDelete(book.id)}
            className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md'
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

// Export the BookList component as the default export of this module.
export default BookList;
